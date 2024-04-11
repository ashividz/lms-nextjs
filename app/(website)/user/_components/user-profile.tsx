import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userProfileSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { userType } from "@/types/user-type";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/context/user-context";

interface UserProfileProps {
  user: userType | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const router = useRouter();
  const { updateUser } = useUser();
  const [formReady, setFormReady] = useState(false);
  const form = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
  });
  const { isSubmitting, isValid } = form.formState;
  useEffect(() => {
    if (user) {
      const fullName = user.name?.split(" ");
      let firstName = "";
      let lastName = "";

      if (fullName && fullName.length >= 1) {
        firstName = fullName[0];
      }

      // Combine remaining parts as last name
      if (fullName && fullName.length > 1) {
        lastName = fullName.slice(1).join(" ");
      }
      const defaultValues = {
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
        qualification: user.qualification ?? "",
        profession: user.profession ?? "",
        bio: user.bio ?? "",
      };

      form.reset(defaultValues);
      setFormReady(true);
    }
  }, [user, form]);

  const onSubmit = async (values: z.infer<typeof userProfileSchema>) => {
    try {
      const response = await axios.patch("/api/user", values);
      router.push(`/user/profile/`);
      updateUser();
      toast.success("Profile updated successfully", {
        position: "top-center",
        autoClose: 5000,
      });
    } catch {
      toast.error("Something went wrong while updating profile", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  if (!formReady) {
    return (
      <div className="space-y-8 mt-4 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8 mt-8 w-full">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="First Name"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Last Name"
                        {...field}
                        className="w-full h-12 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="Email"
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={true}
                        placeholder="Phone Number"
                        {...field}
                        className="w-full h-12 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="qualification"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Your Qualification"
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
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Your Profession"
                        {...field}
                        className="w-full h-12 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        {...field}
                        placeholder="e.g. 'I am a full stack developer.'"
                        className="w-full h-32 rounded-md"
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
                Update Profile
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfile;
