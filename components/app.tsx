import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ArrowRight, Leaf, Droplets, Thermometer } from 'lucide-react';

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
        predictedCrop = "Unable to determine";
      }

      setPrediction(predictedCrop);
      setIsSubmitting(false);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80" 
            alt="Agricultural field with crops" 
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Smart Crop Prediction
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Optimize your agricultural yield with data-driven crop recommendations based on soil analysis
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Leaf className="h-6 w-6 text-green-300" />
                </div>
                <span>Soil Nutrient Analysis</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Droplets className="h-6 w-6 text-blue-300" />
                </div>
                <span>Humidity & Rainfall Data</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Thermometer className="h-6 w-6 text-orange-300" />
                </div>
                <span>Temperature & pH Levels</span>
              </div>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg flex items-center gap-2 shadow-lg"
              onClick={() => document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="prediction-form" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Predict the Perfect Crop for Your Land</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enter your soil analysis data and environmental factors below to receive an instant crop recommendation tailored to your specific conditions.
            </p>
          </div>
          
          <Card className="w-full shadow-xl border-green-100">
            <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b border-green-100">
              <CardTitle className="text-2xl text-gray-800">Soil Analysis Parameters</CardTitle>
              <CardDescription>
                Enter accurate measurements for the most precise prediction results.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="n"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nitrogen (N)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} className="focus:border-green-500 focus:ring-green-500" />
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
                            <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} className="focus:border-green-500 focus:ring-green-500" />
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
                            <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} className="focus:border-green-500 focus:ring-green-500" />
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
                            <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} className="focus:border-green-500 focus:ring-green-500" />
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
                            <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} className="focus:border-green-500 focus:ring-green-500" />
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
                            <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} className="focus:border-green-500 focus:ring-green-500" />
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
                            <Input type="number" step="0.01" {...field} onChange={e => field.onChange(+e.target.value)} className="focus:border-green-500 focus:ring-green-500" />
                          </FormControl>
                          <FormDescription>Range: 20.21-298.56</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 text-lg shadow-md"
                    >
                      {isSubmitting ? 'Analyzing Data...' : 'Predict Optimal Crop'}
                    </Button>
                  </div>
                </form>
              </Form>
              {prediction && (
                <Alert className="mt-8 border-green-200 bg-green-50">
                  <AlertTitle className="text-xl text-green-800">Prediction Result</AlertTitle>
                  <AlertDescription className="text-green-700 text-lg">
                    Based on your soil analysis, the recommended crop is: <strong className="text-green-900 font-bold text-xl">{prediction}</strong>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default CropPrediction;
