'use client';

import { motion } from 'framer-motion';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useForm as useFormspree, ValidationError } from '@formspree/react';

const formSchema = z.object({
  name: z.string().min(2, 'Votre nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const form = useReactHookForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const [state, handleSubmit] = useFormspree("xpwpaaog");

  function onSubmit(data: FormValues) {
    handleSubmit(data);
    if (state.succeeded) {
      toast.success('Message envoyé avec succès !');
      form.reset();
    }
  }

  return (
    <div className="py-12 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Contactez moi</h1>
        <p className="text-muted-foreground mb-8">
          Vous avez une question ou un projet en tête ? N'hésitez pas à me contacter !
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Votre Nom" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="votre@email.com" {...field} />
                  </FormControl>
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Votre message"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={state.submitting}>
              Envoyer le message
            </Button>
          </form>
        </Form>
      </motion.div>
    </div>
  );
}