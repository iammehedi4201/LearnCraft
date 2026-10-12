function Log(
  _target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  // Replace the original method with a wrapped version
  descriptor.value = function (...args: any[]) {
    console.log(`🚀 [LOG] Calling "${propertyKey}" with arguments:`, args);

    // Call the original method with the original context and arguments
    const result = originalMethod.apply(this, args);

    console.log(`✅ [LOG] "${propertyKey}" returned:`, result);
    return result;
  };

  return descriptor;
}

class UserService {
  @Log
  createUser(name: string) {
    return { id: 1, name };
  }
}

// --- Usage Test ---
const service = new UserService();
service.createUser("Mehedi");



