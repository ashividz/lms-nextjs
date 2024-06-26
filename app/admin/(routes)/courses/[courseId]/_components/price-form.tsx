"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Pencil, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatCurrency";

import { Courses } from "@prisma/client";

interface PriceFormProps {
  initialData: Courses;
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
  int_price: z.coerce.number(),
});

export const PriceForm = ({ initialData, courseId }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price || undefined,
      int_price: initialData.int_price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course prices updated successfully", {
        position: "top-center",
        autoClose: 5000,
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong while updating course prices", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };
  return (
    <div className="mt-6 border rounded-md p-4 bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Course prices
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              {initialData.price ? (
                <>
                  <Pencil className="w-6 h-6 pr-2" /> Edit prices
                </>
              ) : (
                <>
                  <PlusCircleIcon className="w-6 h-6 pr-2" />
                  Set prices
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.price && "italic text-slate-500"
            )}
          >
            <span className="font-bold mr-2">Indian price : </span>
            {initialData.price
              ? formatCurrency(initialData.price, "INR")
              : "No indian price set yet"}
          </p>
          <p
            className={cn(
              "text-sm mt-2",
              !initialData.price && "italic text-slate-500"
            )}
          >
            <span className="font-bold mr-2">International price : </span>
            {initialData.int_price
              ? formatCurrency(initialData.int_price, "USD")
              : "No international price set yet"}
          </p>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <FormLabel>Indian Price</FormLabel>
                      <Input
                        type="number"
                        step={0.01}
                        disabled={isSubmitting}
                        {...field}
                        placeholder="Set your course price for Indian students"
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="int_price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <FormLabel>International Price</FormLabel>
                      <Input
                        type="number"
                        step={0.01}
                        disabled={isSubmitting}
                        {...field}
                        placeholder="Set your course price for international students"
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-2">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="pt-2"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
