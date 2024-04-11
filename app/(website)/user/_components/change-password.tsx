import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePasswordSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const ChangePassword = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof changePasswordSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/admin/courses/${response.data.id}`);
      toast.success("Course created successfully", {
        position: "top-center",
        autoClose: 5000,
      });
    } catch {
      toast.error("Something went wrong while creating course", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8 mt-8 w-full">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Current Password"
                        {...field}
                        className="w-full h-12 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="New Password"
                        {...field}
                        className="w-full h-12 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Confirm Password"
                        {...field}
                        className="w-full h-12 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-x-2">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="pt-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 cursor-pointer"
              >
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
