import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";
import { routes } from "@/routes";
import { useAuthStore } from "@/stores";
import { SubmitButton } from "@/components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Login = () => {
  const { login, loginError, isLoginLoading } = useAuthStore();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    if (isLoginLoading) return;
    await login(data);
  }

  return (
    <>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Log In</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                {/* Show both validation error and login error */}
                <FormMessage />
                {loginError && !form.formState.errors.email && (
                  <p className="text-sm font-medium text-destructive">
                    {loginError}
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton isDisabled={isLoginLoading}>Log In</SubmitButton>
        </form>
      </Form>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <Link className="underline" to={routes.register}>
          Register
        </Link>
      </div>
    </>
  );
};

export default Login;
