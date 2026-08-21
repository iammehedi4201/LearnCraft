// // ─── 1. Entity / Model ───
// class User {
//   constructor(public id: number, public name: string, public email: string) {}
// }

// // ─── 2. Repository (Data Access) ───
// class UserRepository {
//   private users: User[] = [];

//   save(user: User): User {
//     this.users.push(user);
//     return user;
//   }

//   findById(id: number): User | null {
//     return this.users.find(u => u.id === id) || null;
//   }

//   findAll(): User[] {
//     return [...this.users];
//   }
// }

// // ─── 3. Service (Business Logic) ───
// class UserService {
//   private userRepo: UserRepository;

//   constructor() {
//     this.userRepo = new UserRepository();
//   }

//   createUser(name: string, email: string): User {
//     if (!email.includes("@")) {
//       throw new Error("Invalid email format!");
//     }
//     const user = new User(Date.now(), name, email);
//     return this.userRepo.save(user);
//   }

//   getUser(id: number): User {
//     const user = this.userRepo.findById(id);
//     if (!user) throw new Error("User with ID " + id + " not found!");
//     return user;
//   }

//   getAllUsers(): User[] {
//     return this.userRepo.findAll();
//   }
// }

// // ─── 4. Controller (HTTP Handler) ───
// class UserController {
//   private userService: UserService;

//   constructor() {
//     this.userService = new UserService();
//   }

//   handleCreateUser(name: string, email: string) {
//     try {
//       const user = this.userService.createUser(name, email);
//       console.log("✅ 201 Created: " + user.name + " (" + user.email + ")");
//     } catch (err: any) {
//       console.log("❌ 400 Bad Request: " + err.message);
//     }
//   }

//   handleListUsers() {
//     const users = this.userService.getAllUsers();
//     console.log("📋 200 OK: Total " + users.length + " users");
//     users.forEach(u => console.log("   • " + u.name + " <" + u.email + ">"));
//   }
// }

// // Simulate API Requests
// const controller = new UserController();
// controller.handleCreateUser("Mehedi", "mehedi@test.com");
// controller.handleCreateUser("Alice", "alice@test.com");
// controller.handleCreateUser("InvalidUser", "bad-email");
// controller.handleListUsers();