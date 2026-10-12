import { InterviewQuestion } from "@/types/interview";

export const SYSTEM_DESIGN_QUESTIONS: InterviewQuestion[] = [
  {
    id: "sys-q01",
    trackKey: "system-design",
    category: "Traffic & Security",
    subtopic: "Rate Limiting",
    type: "system-design",
    difficulty: "medium",
    source: "curated",
    question: "How would you design a distributed Rate Limiter? Compare the Token Bucket, Leaky Bucket, and Sliding Window Counter algorithms.",
    answer: `### Simple answer:
A Rate Limiter throttles incoming client requests to protect backend services from denial-of-service (DoS), scraping, and cascading server crashes.

### Algorithm Comparison:
1. **Token Bucket:**
   - A bucket has fixed capacity $C$. Tokens refill at rate $R$ per second.
   - Each request consumes 1 token. If empty, the request is dropped (429 Too Many Requests).
   - **Pros:** Handles short bursts cleanly; memory efficient (stores only timestamp + token count).
   - **Used by:** Amazon, Stripe.

2. **Leaky Bucket:**
   - Requests enter a FIFO queue of capacity $C$ and are processed at a constant leak rate $R$.
   - **Pros:** Smooths traffic spikes into an even flow.
   - **Cons:** Bursts are delayed rather than processed immediately.

3. **Sliding Window Counter:**
   - Combines fixed window counters from previous and current minute with a weighted percentage based on current timestamp.
   - Formula: $\\text{Requests} = \\text{CurrentWindowCount} + \\text{PrevWindowCount} \\times (1 - \\text{TimePassedRatio})$.
   - **Pros:** Solves the boundary-burst flaw of Fixed Window without high memory overhead of Sliding Window Log.

### Distributed Architecture:
- Store counters in **Redis** using atomic Lua scripts to avoid race conditions.
- Key format: \`rate_limit:{user_id_or_ip}:{window}\`.
- Return standard HTTP headers: \`X-RateLimit-Limit\`, \`X-RateLimit-Remaining\`, \`Retry-After\`.

### Interview answer:
A distributed rate limiter prevents server overload by throttling requests. The Token Bucket algorithm is popular because it allows controlled bursts while maintaining an average rate. In a distributed system, counters live in a centralized Redis cluster updated via atomic Lua scripts to avoid race conditions, returning HTTP 429 when limits are exceeded.`,
    followUps: [
      "How do you handle multi-region Redis synchronization without high latency?",
      "What is the difference between client-side IP rate limiting and API key rate limiting behind NAT proxies?",
      "How does a local in-memory token bucket cache reduce Redis read load?"
    ],
    keyPoints: [
      "Token Bucket permits controlled bursts; Leaky Bucket forces constant rate",
      "Sliding Window Counter eliminates fixed-window boundary spikes with low memory",
      "Distributed counters rely on Redis with atomic Lua scripts",
      "Returns HTTP 429 Too Many Requests with standard Retry-After headers"
    ],
    tags: ["system-design", "rate-limiting", "token-bucket", "redis", "scalability"],
    relatedLessonSlug: "/learn/system-design/sys06-load-balancers-and-reverse-proxies",
    relatedLessonName: "SYS-06: Load Balancers, Reverse Proxies & Traffic Routing"
  },
  {
    id: "sys-q02",
    trackKey: "system-design",
    category: "Caching & Data Layers",
    subtopic: "Caching Strategies",
    type: "system-design",
    difficulty: "medium",
    source: "curated",
    question: "Explain Caching Patterns: Cache-Aside vs Write-Through vs Write-Behind. What are Cache Stampede (Thundering Herd) and Cache Penetration?",
    answer: `### Simple answer:
Caching drastically lowers database read latency from milliseconds to microseconds by keeping frequently accessed data in fast RAM (like Redis or Memcached).

### Caching Strategies:
1. **Cache-Aside (Lazy Loading):**
   - Application reads from cache. On cache miss, reads from DB, populates cache, and returns.
   - Writes go directly to DB; cache key is invalidated or deleted.
   - **Pros:** Cache only contains requested data.
   - **Cons:** Cache miss penalty on first access; potential stale data if invalidation fails.

2. **Write-Through:**
   - Application writes to cache first; cache immediately writes to DB synchronously before returning success.
   - **Pros:** Data in cache is never stale.
   - **Cons:** Higher write latency because every write hits both layers.

3. **Write-Behind (Write-Back):**
   - Application writes to cache and returns immediately. Cache asynchronously batches writes to DB in the background.
   - **Pros:** Extreme write throughput (useful for analytics or view counts).
   - **Cons:** Risk of data loss if cache node crashes before flushing to DB.

### Critical Cache Failure Modes:
- **Cache Stampede (Thundering Herd):** High-traffic key expires $\\rightarrow$ thousands of concurrent requests all miss the cache at once and crash the database.
  - *Fix:* Use distributed locks (Redis Redlock), probabilistic early expiration (XFetch), or background refresh crons.
- **Cache Penetration:** Requests for non-existent IDs (e.g. ID -999) bypass cache and hit DB repeatedly.
  - *Fix:* Bloom filters before cache, or cache empty \`null\` values with a short TTL.

### Interview answer:
Cache-Aside lazily loads on misses and invalidates on writes, making it the most common general pattern. Write-Through synchronizes cache and database together, while Write-Behind buffers batch writes asynchronously. The Thundering Herd stampede is mitigated using mutex locks or early refreshing, and Cache Penetration is solved using Bloom filters.`,
    followUps: [
      "What is Cache Breakdown vs Cache Avalanche?",
      "How does a Bloom filter work with zero false negatives?",
      "What eviction policies exist (LRU, LFU, FIFO) and when should each be used?"
    ],
    keyPoints: [
      "Cache-Aside lazily loads on misses and invalidates on writes",
      "Write-Through writes synchronously to cache and DB together",
      "Write-Behind buffers asynchronous batch writes for high throughput",
      "Thundering Herd solved with distributed mutex locks or probabilistic early refreshing"
    ],
    tags: ["caching", "cache-aside", "redis", "thundering-herd", "system-design"],
    relatedLessonSlug: "/learn/system-design/sys05-storage-and-bandwidth-planning",
    relatedLessonName: "SYS-05: Storage & Bandwidth Capacity Planning"
  },
  {
    id: "sys-q03",
    trackKey: "system-design",
    category: "Real-Time Systems",
    subtopic: "Real-Time Protocols",
    type: "system-design",
    difficulty: "medium",
    source: "curated",
    question: "When should you use WebSockets vs Server-Sent Events (SSE) vs Long Polling for real-time web applications?",
    answer: `### Simple answer:
Selecting the right transport protocol depends on directionality, connection scale, and firewall compatibility:

### Comparison Matrix:
| Feature | WebSockets | Server-Sent Events (SSE) | Long Polling |
|---|---|---|---|
| **Direction** | **Full-Duplex** (Bi-directional) | **Mono-Directional** (Server $\\rightarrow$ Client) | Emulated Bi-directional |
| **Protocol** | \`ws://\` / \`wss://\` (TCP upgrade) | Standard HTTP/1.1 or HTTP/2 | Standard HTTP requests |
| **Reconnection** | Manual reconnect logic needed | **Built-in** automatic reconnect | Manual loop in JavaScript |
| **Data Format** | Binary (ArrayBuffer) or UTF-8 Text | UTF-8 Text only (\`text/event-stream\`) | JSON / text |
| **Overhead** | Very low per-frame overhead | Low overhead over HTTP/2 | High (new headers per poll) |
| **Best For** | Chat apps, collaborative docs, gaming | Stock feeds, AI streaming, notifications | Legacy browser fallbacks |

### Practical Architecture Recommendation:
- If you only need **streaming AI responses (like ChatGPT)** or **notifications/price updates**: Use **SSE**. It works over standard HTTP/2 multiplexing, supports automatic reconnection with \`Last-Event-ID\`, and traverses corporate firewalls with zero issues.
- If you need **interactive bi-directional messaging** (chat input, multiplayer cursor coordinates): Use **WebSockets**.

### Interview answer:
Use WebSockets when you need low-latency, full-duplex bidirectional communication (like online multiplayer games or collaborative whiteboards). Use Server-Sent Events (SSE) when you only need server-to-client streaming (like AI text generation or stock feeds), because SSE operates over standard HTTP with native reconnection and simpler firewall traversal.`,
    followUps: [
      "How does HTTP/2 multiplexing mitigate the 6-connection per domain limit for SSE?",
      "How do you scale WebSockets horizontally across multiple server nodes?",
      "What role does Redis Pub/Sub or Apache Kafka play in distributing socket events across nodes?"
    ],
    keyPoints: [
      "WebSockets offer low-overhead bidirectional full-duplex communication",
      "SSE offers simple unidirection server-to-client streaming over HTTP with native reconnects",
      "Long polling has high HTTP overhead and should be avoided in modern apps",
      "Horizontal WebSocket scaling requires Redis Pub/Sub adapter to broadcast across instances"
    ],
    tags: ["websockets", "sse", "realtime", "http2", "streaming"],
    relatedLessonSlug: "/learn/system-design/sys07-stateless-vs-stateful-services",
    relatedLessonName: "SYS-07: Stateless Architecture & Session Decoupling"
  },
  {
    id: "sys-q04",
    trackKey: "system-design",
    category: "Traffic Routing",
    subtopic: "Load Balancing",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is a Load Balancer? Compare Layer 4 vs Layer 7 Load Balancing and common balancing algorithms.",
    answer: `### Simple answer:
A Load Balancer distributes incoming network traffic across multiple backend servers to prevent any single server from becoming overwhelmed, ensuring high availability and reliability.

### Layer 4 vs Layer 7 Load Balancer:
- **Layer 4 (Transport Layer - TCP/UDP):**
  - Routes traffic based on IP address and port without inspecting message content.
  - Extremely fast and lightweight with low CPU overhead.
  - Cannot read HTTP headers, cookies, or URL paths.
  - *Example:* AWS Network Load Balancer (NLB), HAProxy (TCP mode).
- **Layer 7 (Application Layer - HTTP/HTTPS):**
  - Inspects the full HTTP request (URL paths, cookies, headers).
  - Can route \`/api/billing\` to Billing servers and \`/api/users\` to User servers (Path-based routing).
  - Can terminate SSL/TLS certificates and inspect authentication tokens.
  - *Example:* AWS Application Load Balancer (ALB), NGINX.

### Common Load Balancing Algorithms:
1. **Round Robin:** Sends requests sequentially (Server 1, Server 2, Server 3...). Best when all servers have equal capacity.
2. **Weighted Round Robin:** Sends more requests to servers with higher CPU/RAM specs.
3. **Least Connections:** Sends traffic to the server with the fewest active open connections (great for long-lived sessions).
4. **IP Hash (Consistent Hashing):** Hashes client IP to always route a user to the same server (sticky sessions).

### Interview answer:
A load balancer distributes incoming traffic across backend nodes. Layer 4 load balancers operate at the transport layer routing purely on IP and port with high speed, while Layer 7 load balancers inspect HTTP headers and URL paths for intelligent content-based routing and SSL termination. Common algorithms include Round Robin, Least Connections, and IP Hash.`,
    followUps: [
      "What is SSL/TLS Termination at the load balancer level?",
      "How do health checks automatically remove unhealthy nodes from the pool?",
      "What is DNS Load Balancing (Anycast / Round Robin DNS) versus Hardware Load Balancing?"
    ],
    keyPoints: [
      "Layer 4 routes at TCP level based on IP/port with low latency",
      "Layer 7 routes at HTTP level based on headers, cookies, and URL paths",
      "Algorithms: Round Robin, Least Connections, IP Hash",
      "Performs health checks to automatically route around failing instances"
    ],
    tags: ["load-balancer", "layer4", "layer7", "round-robin", "nginx"],
    relatedLessonSlug: "/learn/system-design/sys06-load-balancers-and-reverse-proxies",
    relatedLessonName: "SYS-06: Load Balancers, Reverse Proxies & Traffic Routing"
  },
  {
    id: "sys-q05",
    trackKey: "system-design",
    category: "Distributed Systems Theory",
    subtopic: "CAP Theorem",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "Explain the CAP Theorem and the PACELC Theorem in distributed systems design.",
    answer: `### Simple answer:
The **CAP Theorem** states that a distributed data store can guarantee at most **two out of three** properties during a network failure:

1. **Consistency (C):** Every read receives the most recent write or an error (all nodes see the exact same data simultaneously).
2. **Availability (A):** Every non-failing node returns a non-error response, but without guaranteeing it's the latest write.
3. **Partition Tolerance (P):** The system continues to operate despite network messages being dropped or delayed between nodes.

### The Trade-off: CP vs AP
Because network cables and cloud networks inevitably experience partitions ($P$ is mandatory in real-world distributed networks), systems must choose between:
- **CP (Consistency + Partition Tolerance):** If a network split occurs, reject writes or wait until nodes reconnect to avoid serving conflicting data (e.g. HBase, MongoDB, Spanner).
- **AP (Availability + Partition Tolerance):** Allow nodes to accept writes and reads independently even when disconnected, accepting eventual consistency (e.g. Cassandra, DynamoDB).

### The PACELC Theorem:
CAP only describes behavior **during a partition ($P$)**. PACELC extends it to normal operating conditions:
> **If Partition ($P$):** Choose between Availability ($A$) and Consistency ($C$);
> **Else ($E$):** Choose between Latency ($L$) and Consistency ($C$).

### Interview answer:
The CAP theorem states that distributed databases must choose between Consistency and Availability when network partitions occur. CP systems guarantee data correctness by blocking writes during partitions, while AP systems remain responsive by accepting eventual consistency. PACELC expands this by noting that during normal conditions without partitions, systems trade off latency versus consistency.`,
    followUps: [
      "What is Eventual Consistency and how does it relate to AP systems?",
      "Can a database switch between CP and AP based on query parameters (like Cassandra consistency levels)?",
      "Why is a single-node PostgreSQL database not bound by the CAP theorem?"
    ],
    keyPoints: [
      "Network partitions (P) are unavoidable in distributed systems",
      "CP chooses consistency over availability during network splits",
      "AP chooses availability over consistency during network splits",
      "PACELC adds Latency vs Consistency trade-offs during normal operating state"
    ],
    tags: ["cap-theorem", "pacelc", "distributed-systems", "consistency", "availability"],
    relatedLessonSlug: "/learn/system-design/sys01-what-is-system-design",
    relatedLessonName: "SYS-01: System Design Fundamentals & Scale Foundations"
  },
  {
    id: "sys-q06",
    trackKey: "system-design",
    category: "Architecture & Scaling",
    subtopic: "Horizontal vs Vertical Scaling",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the difference between Horizontal Scaling and Vertical Scaling? How does a Stateless Architecture enable horizontal scale?",
    answer: `### Simple answer:
- **Vertical Scaling (Scaling Up):** Adding more CPU, RAM, or faster SSDs to a **single server**.
- **Horizontal Scaling (Scaling Out):** Adding **more server nodes** to a cluster behind a load balancer.

### Comparison:
| Aspect | Vertical Scaling (Scale Up) | Horizontal Scaling (Scale Out) |
|---|---|---|
| **Limit** | Hard hardware ceiling (you can only buy a server so big) | Virtually limitless (add hundreds of cheap cloud instances) |
| **Downtime** | Requires downtime to upgrade hardware | Zero downtime (add/remove nodes dynamically) |
| **Cost** | Exponentially expensive for high-end server hardware | Cost-effective using commodity cloud instances |
| **Fault Tolerance** | Single point of failure (if that one machine dies, app is down) | High availability (if 1 node dies, 99 others serve traffic) |

### Stateless Architecture:
To scale horizontally, application servers must be **Stateless**:
- Servers must **not store user sessions in local server RAM** (e.g. memory session arrays).
- If Server 1 crashes or a user's next request routes to Server 2, Server 2 must be able to handle it seamlessly.
- **How to achieve statelessness:** Externalize session state to **Redis**, use **JWT tokens**, and store files in shared object storage like **AWS S3**.

### Interview answer:
Vertical scaling adds more resources to a single machine, which has hard hardware limits and downtime. Horizontal scaling adds more machines behind a load balancer, providing infinite scaling and high availability. Horizontal scaling requires stateless application servers, meaning session data is stored in distributed stores like Redis rather than local server memory.`,
    followUps: [
      "What are the challenges of horizontally scaling stateful databases compared to stateless web servers?",
      "How do auto-scaling groups in AWS work based on CPU and request count metrics?",
      "What is Sticky Sessions (Session Affinity) and why is it an anti-pattern for pure stateless scaling?"
    ],
    keyPoints: [
      "Vertical scaling upgrades single machine specs; horizontal scaling adds more nodes",
      "Horizontal scaling provides fault tolerance and zero-downtime deployments",
      "Stateless servers do not store session state in local memory",
      "Externalize sessions to Redis and assets to object stores (S3)"
    ],
    tags: ["horizontal-scaling", "vertical-scaling", "stateless", "architecture", "scalability"],
    relatedLessonSlug: "/learn/system-design/sys07-stateless-vs-stateful-services",
    relatedLessonName: "SYS-07: Stateless Architecture & Session Decoupling"
  },
  {
    id: "sys-q07",
    trackKey: "system-design",
    category: "System Design Problems",
    subtopic: "URL Shortener (TinyURL)",
    type: "system-design",
    difficulty: "medium",
    source: "curated",
    question: "How would you design a scalable URL Shortener service like TinyURL or Bitly?",
    answer: `### Simple answer:
A URL shortener converts long URLs (e.g. 100 characters) into short, unique aliases (e.g. \`https://tiny.url/7bX9qA\`) and redirects users when accessed.

### Key Requirements & Numbers:
- **Write:** 100 million new URLs/month $\\rightarrow$ ~40 writes/sec.
- **Read-to-Write Ratio:** 100:1 $\\rightarrow$ 4,000 reads/sec (read-heavy!).
- **Storage:** 100M URLs $\\times$ 500 bytes $\\times$ 5 years $\\approx$ 3 TB storage (very manageable).

### Core Architecture:
\`\`\`
Client ──> CDN / Load Balancer ──> API Servers ──> Redis Cache ──> PostgreSQL / NoSQL
\`\`\`

### How to generate the short URL:
1. **Base62 Encoding:** Uses characters \`[0-9, a-z, A-Z]\` (62 possible characters).
   - A 7-character string gives $62^7 \\approx 3.5 \\text{ trillion}$ unique URLs!
2. **Method A: Hashing (MD5/SHA-256):** Hash the URL and take first 7 chars. Problem: Hash collisions require collision checking.
3. **Method B: Distributed ID Generator + Base62 (Best Approach):**
   - Generate a unique 64-bit auto-incrementing integer using a **Twitter Snowflake** or Redis counter.
   - Convert that integer to Base62: \`base62(125307) -> "w17"\`.
   - **Zero collisions guaranteed!**

### Redirection & Status Codes:
- Return **HTTP 302 Found (Temporary Redirect)** if you want to track click analytics on your servers.
- Return **HTTP 301 Moved Permanently** if you want browsers to cache the redirect and reduce server load.

### Caching:
Cache the most popular 20% of URLs in **Redis** (80-20 Pareto principle) to serve 80% of read traffic directly from memory.

### Interview answer:
TinyURL is a read-heavy system. We assign each long URL a unique 64-bit integer ID and encode it into a 7-character Base62 string ($62^7 = 3.5 \\text{ trillion combinations}$). We store the mapping in a database with unique indexes, cache hot URLs in Redis, and return HTTP 302 redirects to track click analytics.`,
    followUps: [
      "Why is HTTP 302 preferred over HTTP 301 when analytics tracking is required?",
      "How do you handle custom aliases requested by users (e.g. tiny.url/my-custom-name)?",
      "What database engine (Postgres vs Cassandra/DynamoDB) would you choose for storing URL mappings?"
    ],
    keyPoints: [
      "Read-heavy system (100:1 read-to-write ratio)",
      "Base62 encoding of a unique 64-bit ID yields 3.5 trillion collision-free 7-character URLs",
      "HTTP 302 allows tracking analytics; HTTP 301 delegates caching to browser",
      "Cache hot 20% of URLs in Redis for microsecond read latency"
    ],
    tags: ["url-shortener", "tinyurl", "base62", "system-design", "case-study"],
    relatedLessonSlug: "/learn/system-design/sys04-estimation-and-capacity-planning",
    relatedLessonName: "SYS-04: Estimation & Capacity Planning Calculations"
  },
  {
    id: "sys-q08",
    trackKey: "system-design",
    category: "Distributed Algorithms",
    subtopic: "Consistent Hashing",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "What is Consistent Hashing, and why is it used in distributed caching systems and databases like DynamoDB and Cassandra?",
    answer: `### Simple answer:
Consistent Hashing is a distributed hashing algorithm where adding or removing a cache server requires moving only $K/N$ keys on average (where $K$ is keys and $N$ is servers), instead of remapping almost every single key in the cluster.

### The Problem with Simple Modulo Hashing:
With simple hashing: \`serverIndex = hash(key) % N\`.
- If you have 4 servers and 1 server dies ($N$ becomes 3), the formula changes for **almost every single key** in the entire cache.
- Result: **Cache Avalanche**! 100% of queries miss the cache simultaneously and crash the database!

### How Consistent Hashing Works:
1. **The Hash Ring:** Map both servers and keys to a 360-degree circular ring (from $0$ to $2^{32}-1$).
2. **Placing Servers:** Hash server IP addresses to points on the ring.
3. **Placing Keys:** Hash keys to points on the ring.
4. **Locating a Key:** Move **clockwise** from the key's position on the ring until you find the first server.
5. **Adding/Removing Nodes:** When Server 2 is removed, only keys between Server 1 and Server 2 move to Server 3. All other servers remain completely unaffected!

### Virtual Nodes (V-Nodes):
To prevent uneven data distribution (where one server gets 80% of the ring), each physical server is mapped to **hundreds of virtual nodes** scattered across the ring, ensuring an even, balanced data spread.

### Interview answer:
Traditional modulo hashing invalidates nearly all cached keys when a node joins or leaves. Consistent Hashing places nodes and keys on a circular hash ring, routing keys clockwise to the nearest server. When a node fails, only a fraction ($1/N$) of keys are remapped. Virtual nodes are used to ensure uniform key distribution across servers.`,
    followUps: [
      "How do Virtual Nodes (V-Nodes) resolve hot spots and hardware heterogeneity?",
      "How do Cassandra and DynamoDB use consistent hashing for replication across successive clockwise nodes?",
      "What is the time complexity of locating a key on a consistent hash ring using binary search?"
    ],
    keyPoints: [
      "Simple modulo hashing (% N) invalidates all keys when cluster size changes",
      "Consistent hashing maps nodes and keys to a 360-degree circular ring",
      "Adding/removing a server only remaps K/N keys",
      "Virtual nodes ensure uniform data distribution across physical servers"
    ],
    tags: ["consistent-hashing", "hash-ring", "distributed-cache", "cassandra", "dynamodb"],
    relatedLessonSlug: "/learn/system-design/sys05-storage-and-bandwidth-planning",
    relatedLessonName: "SYS-05: Storage & Bandwidth Capacity Planning"
  },
  {
    id: "sys-q09",
    trackKey: "system-design",
    category: "Messaging & Queues",
    subtopic: "Kafka vs RabbitMQ",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "Compare Apache Kafka and RabbitMQ. When should you use a Message Queue vs an Event Streaming log?",
    answer: `### Simple answer:
- **RabbitMQ (Message Queue):** A smart message broker that routes messages to queues and deletes them as soon as consumers acknowledge receipt.
- **Apache Kafka (Event Streaming Log):** An append-only distributed commit log that retains messages on disk for days or months, allowing multiple consumers to replay events independently at their own pace.

### Comparison Table:
| Feature | RabbitMQ (Message Broker) | Apache Kafka (Distributed Log) |
|---|---|---|
| **Architecture** | Smart broker, dumb consumer (broker tracks delivery) | Dumb broker, smart consumer (consumer tracks offset) |
| **Message Retention** | Deleted upon consumer ACK | **Retained on disk** for configured TTL (e.g. 7 days) |
| **Message Replay** | Cannot replay processed messages | **Yes!** Consumers can rewind offset and replay events |
| **Throughput** | Moderate (~10,000–50,000 msgs/sec) | **Extreme** (millions of msgs/sec via sequential disk I/O) |
| **Routing** | Complex routing (Exchange, Topic, Direct, Headers) | Simple topic partitioning |
| **Best For** | Background worker tasks, transactional commands | Event sourcing, metrics, clickstream logs, real-time analytics |

### Interview answer:
Use RabbitMQ for traditional message queuing where individual background jobs are routed to workers and deleted upon completion. Use Kafka for high-throughput event streaming where events must be ordered, retained, and replayed by multiple independent consumer services (like analytics pipelines and event sourcing).`,
    followUps: [
      "What is the difference between At-Least-Once, At-Most-Once, and Exactly-Once message delivery?",
      "How does Kafka partitioning guarantee strict ordering within a partition?",
      "What is the Dead Letter Queue (DLQ) pattern in RabbitMQ?"
    ],
    keyPoints: [
      "RabbitMQ deletes messages after delivery acknowledgment",
      "Kafka stores an immutable append-only commit log with consumer-managed offsets",
      "Kafka supports event replay and high throughput via sequential disk writes",
      "RabbitMQ offers flexible exchange routing for background task processing"
    ],
    tags: ["kafka", "rabbitmq", "message-queues", "event-streaming", "architecture"],
    relatedLessonSlug: "/learn/system-design/sys07-stateless-vs-stateful-services",
    relatedLessonName: "SYS-07: Stateless Architecture & Session Decoupling"
  },
  {
    id: "sys-q10",
    trackKey: "system-design",
    category: "Database Architecture",
    subtopic: "Replication and Split-Brain",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "What is Leader-Follower (Master-Slave) database replication, and what is a Split-Brain scenario?",
    answer: `### Simple answer:
Leader-Follower replication designates one database node as the **Leader (Primary)** that accepts all write operations, while one or more **Followers (Replicas)** replicate the write log asynchronously or synchronously to handle read queries.

### Replication Types:
- **Synchronous Replication:** Leader waits for replica to confirm write before returning success to client. High durability, but higher latency and writes fail if replica is offline.
- **Asynchronous Replication (Standard):** Leader returns success immediately and replicates in background. Fast, but if leader crashes before replicating, data is lost (Replication Lag).

### The Split-Brain Scenario:
Split-Brain occurs when a network partition disconnects database nodes from each other:
1. Node A (Primary in Data Center 1) and Node B (Secondary in Data Center 2) lose connection.
2. Data Center 2 assumes Node A is dead and promotes Node B to **Primary**.
3. Now, **both Node A and Node B believe they are the Primary!**
4. Both accept conflicting write operations independently from different clients.
5. When the network reconnects, data cannot be reconciled without manual intervention or data corruption!

### How to Prevent Split-Brain:
1. **Quorum (Majority Voting):** A node can only become or remain Primary if it can communicate with a strict majority ($> 50\%$) of cluster members (e.g. 2 out of 3, or 3 out of 5).
2. **Odd Number of Nodes:** Always run clusters with an odd number of voting nodes (3, 5, 7) to guarantee there is never a 50/50 tie.

### Interview answer:
In Leader-Follower replication, the Leader handles writes and replicates to read-only Followers. Split-Brain occurs when network partitions cause multiple nodes to believe they are the active Leader, causing conflicting writes. We prevent this using Quorum consensus where nodes require a strict majority vote ($>50\%$) across an odd number of nodes to elect a Leader.`,
    followUps: [
      "What is Replication Lag and how does it cause read-your-own-writes inconsistencies?",
      "How does Raft / Paxos consensus prevent split-brain?",
      "What is Multi-Leader (Master-Master) replication and how are write conflicts resolved?"
    ],
    keyPoints: [
      "Leader accepts writes; Followers handle read traffic",
      "Asynchronous replication provides high speed but risks replication lag",
      "Split-Brain occurs when network partitions create multiple active leaders",
      "Quorum majority voting (>50%) across an odd number of nodes prevents split-brain"
    ],
    tags: ["replication", "leader-follower", "split-brain", "quorum", "databases"],
    relatedLessonSlug: "/learn/system-design/sys07-stateless-vs-stateful-services",
    relatedLessonName: "SYS-07: Stateless Architecture & Session Decoupling"
  },
  {
    id: "sys-q11",
    trackKey: "system-design",
    category: "Networking & Edge",
    subtopic: "CDNs and Anycast",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "How does a Content Delivery Network (CDN) work, and how does Anycast routing direct users to the closest Point of Presence (PoP)?",
    answer: `### Simple answer:
A Content Delivery Network (CDN) is a geographically distributed network of proxy servers that cache static and dynamic content close to users, drastically reducing latency and offloading origin server traffic.

### How it works:
1. When a user in London requests an image, they connect to a CDN **Point of Presence (PoP)** edge server in London instead of routing across the Atlantic to your origin server in California.
2. If cached, the edge server returns the file in under 10ms.
3. If not cached, the edge server fetches it from the origin once, caches it, and returns it.

### How Anycast Routing works:
- Traditionally, each IP address belongs to one single machine (Unicast).
- With **Anycast BGP Routing**, **hundreds of servers across the world share the exact same IP address!**
- When a user's browser requests that IP, internet routers automatically route the packets to the geographically closest server on the network using shortest BGP path calculation.

### Cache Invalidation Strategies:
- **Time-To-Live (TTL):** Files expire automatically after a set duration.
- **Content Hashing:** Static assets have hashes in filenames (\`bundle.a7b9c.js\`), allowing infinite cache headers (\`Cache-Control: immutable, max-age=31536000\`).
- **Purge API:** Calling Cloudflare/CloudFront purge endpoints on deployment.

### Interview answer:
A CDN caches content at edge Points of Presence close to users to minimize latency. Anycast BGP routing assigns the same IP address to servers globally, allowing internet routing tables to direct users automatically to the nearest geographical edge server. Asset hashing enables aggressive caching with zero stale deployment risk.`,
    followUps: [
      "What is Edge Computing (Cloudflare Workers, Vercel Edge Functions)?",
      "How do CDNs protect origin servers from DDoS attacks?",
      "What is the difference between Pull CDN and Push CDN?"
    ],
    keyPoints: [
      "Points of Presence (PoPs) cache content at the network edge",
      "Anycast routes traffic to the nearest server sharing the same IP",
      "Reduces origin server bandwidth and server load by 80%+",
      "Content hashing (immutable assets) enables infinite caching safely"
    ],
    tags: ["cdn", "anycast", "caching", "edge-networking", "performance"],
    relatedLessonSlug: "/learn/system-design/sys06-load-balancers-and-reverse-proxies",
    relatedLessonName: "SYS-06: Load Balancers, Reverse Proxies & Traffic Routing"
  },
  {
    id: "sys-q12",
    trackKey: "system-design",
    category: "Distributed Algorithms",
    subtopic: "Unique ID Generation",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "How do you design a Distributed Unique ID Generator (Twitter Snowflake) that produces 64-bit sortable IDs at scale?",
    answer: `### Simple answer:
In high-scale distributed systems, database auto-increment IDs fail because a single database bottleneck cannot keep up with millions of writes, and multi-master offsets are complex. UUID v4 solves uniqueness but is a 128-bit string that is **not sortable**, degrading B-Tree database indexing performance.

### Twitter Snowflake (64-bit Sortable ID):
Generates a 64-bit integer composed of 4 parts:

\`\`\`
1 bit      41 bits                  10 bits            12 bits
┌───┬────────────────────────────┬──────────────────┬─────────────┐
│ 0 │   Timestamp (milliseconds) │ Machine/Node ID  │ Sequence ID │
└───┴────────────────────────────┴──────────────────┴─────────────┘
\`\`\`

1. **1 bit (Sign bit):** Always 0 (keeps numbers positive).
2. **41 bits (Timestamp):** Milliseconds since a custom epoch (provides $\\approx 69$ years of IDs).
3. **10 bits (Machine / Worker ID):** Identifies which server created the ID (allows up to $2^{10} = 1024$ nodes).
4. **12 bits (Sequence Number):** Incremental counter per millisecond (allows $2^{12} = 4096$ IDs per millisecond per node!).

### Key Benefits:
- **Fits in a 64-bit BigInt:** Compact storage in database indexes.
- **Roughly Time-Sortable:** IDs naturally sort by creation date because the timestamp is the leading bit segment.
- **Zero Coordination:** Nodes generate IDs locally without network roundtrips to a central database!

### Interview answer:
Twitter Snowflake generates 64-bit unique IDs using 41 bits for millisecond timestamp, 10 bits for worker node ID, and 12 bits for a local sequence counter. This design provides 4,096 IDs per millisecond per machine without cross-network coordination, and the leading timestamp ensures IDs are naturally chronological for efficient database B-Tree indexing.`,
    followUps: [
      "What happens if a server's system clock drifts backward (NTP clock drift)?",
      "How does UUID v7 compare to Twitter Snowflake?",
      "Why do completely random UUID v4s degrade B-Tree index insertion performance?"
    ],
    keyPoints: [
      "Generates 64-bit integers fitting in BigInt database columns",
      "41-bit timestamp + 10-bit machine ID + 12-bit sequence counter",
      "Chronologically sorted for efficient B-Tree indexing",
      "Decentralized: nodes generate IDs locally with zero network roundtrips"
    ],
    tags: ["snowflake", "unique-id", "distributed-ids", "twitter-snowflake", "algorithms"],
    relatedLessonSlug: "/learn/system-design/sys04-estimation-and-capacity-planning",
    relatedLessonName: "SYS-04: Estimation & Capacity Planning Calculations"
  },
  {
    id: "sys-q13",
    trackKey: "system-design",
    category: "System Design Problems",
    subtopic: "Notification System",
    type: "system-design",
    difficulty: "medium",
    source: "curated",
    question: "How would you design a scalable Notification System supporting Push notifications, SMS, and Email?",
    answer: `### Simple answer:
A notification system dispatches millions of messages across third-party providers (APNs for iOS, FCM for Android, Twilio for SMS, SendGrid for Email) with user preference filtering and rate limiting.

### High-Level Architecture:
\`\`\`
Client Services (Billing, Social, Auth)
               │
               ▼
   [Notification API Service]
        ├── Verify User Settings / Opt-outs
        └── Deduplication & Rate Limiting
               │
               ▼
   [Message Queues (Kafka / RabbitMQ)]
     ├── Queue: Push (FCM / APNs)
     ├── Queue: SMS (Twilio)
     └── Queue: Email (SendGrid)
               │
               ▼
   [Dedicated Worker Consumers] ──> Third-party Gateways ──> User Devices
\`\`\`

### Key Architectural Challenges:
1. **Third-party Failures & Retries:** External providers can fail or throttle. Workers use exponential backoff retries and Dead Letter Queues (DLQ).
2. **Idempotency:** Prevent sending duplicate charges or welcome emails twice. Each notification gets an \`idempotency_key\` tracked in Redis.
3. **User Notification Settings:** Users can toggle off marketing emails while leaving security SMS alerts enabled. Checked before enqueuing.
4. **Rate Limiting / Do Not Disturb:** Cap push notifications to at most 3 per user per hour to prevent notification spam.

### Interview answer:
A scalable notification system decouples message creation from delivery using dedicated message queues for each channel (Push, SMS, Email). Workers process queues asynchronously with exponential backoff retries. We enforce idempotency using unique request keys in Redis to avoid duplicate sends and filter messages against user preference tables before dispatch.`,
    followUps: [
      "How do you implement an Idempotency Key in payment and notification APIs?",
      "What is a Dead Letter Queue (DLQ) and how do operators handle failed notifications?",
      "How would you prioritize critical security alerts (2FA codes) over promotional marketing emails?"
    ],
    keyPoints: [
      "Decoupled asynchronous architecture using channel-specific message queues",
      "Idempotency keys prevent duplicate notification dispatches",
      "Respects user preference tables and rate limits per channel",
      "Worker pools handle external vendor throttling and exponential backoff"
    ],
    tags: ["notification-system", "system-design", "message-queues", "idempotency"],
    relatedLessonSlug: "/learn/system-design/sys07-stateless-vs-stateful-services",
    relatedLessonName: "SYS-07: Stateless Architecture & Session Decoupling"
  },
  {
    id: "sys-q14",
    trackKey: "system-design",
    category: "Distributed Architecture",
    subtopic: "Microservices vs Monoliths",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "Compare Microservices vs Monoliths. How do you handle distributed transactions using the Saga Pattern?",
    answer: `### Simple answer:
- **Monolith:** Single deployable codebase where all modules run in the same process and share a single database. Easy to develop initially, but scales poorly across large autonomous teams.
- **Microservices:** Loosely coupled independent services deployed separately, each owning its own **private database (Database-per-Service)**.

### The Problem: Distributed Transactions
In a monolith, transferring money or placing an order is an ACID transaction in one database. In microservices, an order involves three separate databases: Order Service, Payment Service, and Inventory Service. **Traditional two-phase commits (2PC) do not scale** across microservices.

### The Solution: The Saga Pattern
A Saga is a sequence of local transactions where each service updates its own database. If a step fails, the saga executes **Compensating Transactions** to undo the previous steps:

\`\`\`
Order Placed ──> [Order Service (Pending)]
                     │
                     ▼
           [Payment Service (Charges Card)]
                     │
                     ▼
           [Inventory Service (Out of Stock!)]
                     │
                     ▼ (Compensating Transactions!)
           [Payment Service (Refunds Card)]
                     │
                     ▼
           [Order Service (Marks Cancelled)]
\`\`\`

### Two Saga Coordination Approaches:
1. **Choreography:** Services listen to domain events and decide when to act (event-driven, no central coordinator).
2. **Orchestration:** A central Orchestrator service tells each participant what transaction to execute.

### Interview answer:
Microservices provide independent deployability and domain scaling, but prevent traditional ACID database transactions. The Saga pattern solves distributed transactions by executing a chain of local transactions where each service handles its own database, accompanied by compensating transactions that undo previous steps if a subsequent service fails.`,
    followUps: [
      "What is the difference between Choreography and Orchestration in the Saga pattern?",
      "Why is Two-Phase Commit (2PC) considered an anti-pattern in cloud microservices?",
      "What is the Outbox Pattern for reliable event publishing from database transactions?"
    ],
    keyPoints: [
      "Database-per-Service principle enforces data isolation between microservices",
      "Two-Phase Commit (2PC) is slow, blocking, and creates tight coupling",
      "Saga pattern coordinates sequential local transactions with compensating rollbacks",
      "Can be implemented via event-driven Choreography or centralized Orchestration"
    ],
    tags: ["microservices", "saga-pattern", "distributed-transactions", "monolith", "architecture"],
    relatedLessonSlug: "/learn/system-design/sys07-stateless-vs-stateful-services",
    relatedLessonName: "SYS-07: Stateless Architecture & Session Decoupling"
  },
  {
    id: "sys-q15",
    trackKey: "system-design",
    category: "System Design Problems",
    subtopic: "Chat System Design",
    type: "system-design",
    difficulty: "hard",
    source: "curated",
    question: "How would you design a real-time Chat System like WhatsApp, Slack, or Discord at scale?",
    answer: `### Simple answer:
A real-time chat application requires bi-directional low-latency messaging, online presence tracking, message persistence, and offline delivery handling for millions of concurrent users.

### High-Level Architecture:
1. **Chat Servers (WebSocket Cluster):** Maintain persistent stateful WebSocket connections to online users.
2. **Presence Servers:** Track who is online/offline using Redis heartbeats with short TTLs.
3. **Message Service & Storage:** Persists chat history in a database optimized for sequential writes and timeline queries (Cassandra, ScyllaDB, or HBase).
4. **Redis Pub/Sub / Message Broker:** Routes messages between Chat Servers so users connected to different server nodes can communicate.
5. **Push Notification Service:** Dispatches mobile notifications (APNs/FCM) for offline recipients.

### Message Delivery Flow:
\`\`\`
User A ──(WebSocket)──> [Chat Server 1]
                             │
                             ▼
                    [Message DB (Save)]
                             │
                             ▼
                 [Presence Service (Check User B)]
                    ├── If Online on Chat Server 2:
                    │     Redis Pub/Sub ──> Chat Server 2 ──(WebSocket)──> User B
                    └── If Offline:
                          Push Queue ──> FCM / APNs ──> User B's Phone
\`\`\`

### Why Wide-Column NoSQL for Messages?
Chat data is write-heavy and queries are always timeline ranges: *"Get the last 50 messages of chat_id X before timestamp Y"*. Wide-column stores like **Apache Cassandra** provide high sequential write throughput and fast range scans on \`(channel_id, message_id)\`.

### Interview answer:
A scalable chat system uses WebSocket servers for real-time bidirectional delivery, Redis Pub/Sub to route messages across chat server instances, and presence servers for online tracking. Messages are persisted in a wide-column store like Cassandra partitioned by chat ID, and offline recipients are notified via mobile push notifications.`,
    followUps: [
      "How do Presence Servers use heartbeat pings to detect disconnections without false alarms?",
      "How do you handle end-to-end encryption (E2EE) using the Signal protocol?",
      "How does Discord store trillions of messages using ScyllaDB and Rust?"
    ],
    keyPoints: [
      "WebSocket servers maintain persistent stateful connections",
      "Redis Pub/Sub or Kafka routes messages across distributed WebSocket instances",
      "Presence service monitors user online/offline status via heartbeats",
      "Wide-column databases (Cassandra) excel at chat timeline reads and high write throughput"
    ],
    tags: ["chat-system", "websockets", "cassandra", "system-design", "case-study"],
    relatedLessonSlug: "/learn/system-design/sys07-stateless-vs-stateful-services",
    relatedLessonName: "SYS-07: Stateless Architecture & Session Decoupling"
  }
];
