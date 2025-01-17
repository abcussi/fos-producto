interface SignInResponse {
    token: string;
  }
  
  export async function signIn(email: string, password: string): Promise<SignInResponse> {
    if (email === "admin@condaty.com" && password === "123456A") {
      return { token: "fake-jwt-token" };
    } else {
      throw new Error("Credenciales inválidas");
    }
  }
  
  export function signOut() {
    return;
  }
  