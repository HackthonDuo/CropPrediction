'use client'

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Import shadcn components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  n: z.number().min(0).max(140),
  p: z.number().min(5).max(145),
  k: z.number().min(5).max(205),
  temperature: z.number().min(8.83).max(43.68),
  humidity: z.number().min(14.26).max(99.98),
  ph: z.number().min(3.5).max(9.94),
  rainfall: z.number().min(20.21).max(298.56),
});

function CropPrediction() {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      n: 0,
      p: 0,
      k: 0,
      temperature: 0,
      humidity: 0,
      ph: 0,
      rainfall: 0,
    },

  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const { n, humidity, rainfall } = values;
      const maxValue = Math.max(n, humidity, rainfall);
      let predictedCrop: string;

      if (humidity === maxValue) {
        predictedCrop = "Coconut";
      } else if (n === maxValue) {
        predictedCrop = "Lentils";
      } else if (rainfall === maxValue) {
        predictedCrop = Math.random() < 0.5 ? "Rice" : "Watermelon";
      } else {
        // In case of a tie or unexpected scenario
        predictedCrop = "Carrots";
      }

      setPrediction(predictedCrop);
      setIsSubmitting(false);
    }, 500);
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Crop Prediction from Soil Analysis</CardTitle>
          <CardDescription>
            Enter the soil and environmental parameters to predict the suitable crop.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="n"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nitrogen (N)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormDescription>Range: 0-140</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="p"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phosphorus (P)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormDescription>Range: 5-145</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="k"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Potassium (K)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormDescription>Range: 5-205</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temperature (°C)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormDescription>Range: 8.83-43.68</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="humidity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Humidity (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormDescription>Range: 14.26-99.98</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ph"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>pH</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormDescription>Range: 3.5-9.94</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rainfall"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rainfall (mm)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormDescription>Range: 20.21-298.56</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Predicting...' : 'Predict Crop'}
              </Button>
            </form>
          </Form>
          {prediction && (
            <Alert className="mt-4">
              <AlertTitle>Prediction Result</AlertTitle>
              <AlertDescription>The predicted suitable crop is: <strong>{prediction}</strong></AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CropPrediction;