"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

export default function Home() {
  const [score, setScore] = useState<string>("");
  const [average, setAverage] = useState<string>("");
  const [topThirtyAverage, setTopThirtyAverage] = useState<string>("");
  const twoDecimalPlaces = (value: number) => {
    return (
      Number.isInteger(value * 100) && Number.isInteger(value * 10) === false
    );
  };

  const scoreSchema = z
    .number({
      required_error: "Score is required",
      invalid_type_error: "Score must be a number",
    })
    .int("Score must be an integer")
    .min(0, "Score must be at least 0")
    .max(100, "Score cannot exceed 100")
    .refine(Number.isInteger, "Your score shoule be integer");

  const averageSchema = z
    .number({
      required_error: "Average is required",
      invalid_type_error: "Average must be a number",
    })
    .min(0, "Average must be at least 0")
    .max(100, "Average cannot exceed 100")
    .refine(twoDecimalPlaces, "Average must have two decimal places");

  const topThirtyAverageSchema = z
    .number({
      required_error: "Top 30% average is required",
      invalid_type_error: "Top 30% average must be a number",
    })
    .min(0, "Top 30% average must be at least 0")
    .max(100, "Top 30% average cannot exceed 100")
    .refine(twoDecimalPlaces, "Top 30% average must have two decimal places");

  const validateScoreData = () => {
    const errors: string[] = [];

    try {
      const parsedScore = scoreSchema.parse(parseInt(score));
      const parsedAverage = averageSchema.parse(parseFloat(average));
      const parsedTopThirtyAverage = topThirtyAverageSchema.parse(
        parseFloat(topThirtyAverage)
      );
      console.log([parsedScore, parsedAverage, parsedTopThirtyAverage]);
      if (parsedAverage >= parsedTopThirtyAverage) {
        errors.push("The average must be lower than the top 30% average");
      }

      if (errors.length > 0) {
        throw new Error("Custom validation failed");
      }

      return {
        score: parsedScore,
        average: parsedAverage,
        topThirtyAverage: parsedTopThirtyAverage,
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors.push(err.message);
        });
      } else if (
        error instanceof Error &&
        error.message === "Custom validation failed"
      ) {
        // Do nothing, errors are already in the errors array
      } else {
        errors.push(
          "An unexpected error occurred. Please check your inputs and try again."
        );
      }

      // Display each error in a separate toast
      errors.forEach((errorMsg) => {
        toast.error(errorMsg);
      });

      return null;
    }
  };

  const handleAnalyze = () => {
    const validData = validateScoreData();
    if (validData) {
      // Perform analysis here
      toast.success("Score analyzed successfully!");
      console.log("Validated data:", validData);
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ILE Score Analyzer
      </h1>
      <Tabs defaultValue="single" className="m-12 w-[1000px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">One score</TabsTrigger>
          <TabsTrigger value="multi">Multiple Scores</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <Card className="h-[400px] flex justify-center flex-col">
            <CardHeader>
              <CardTitle>One Score</CardTitle>
              <CardDescription>Analyze a single score of test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="your_score">Your Score</Label>
                <Input
                  id="your_score"
                  placeholder="Type your score"
                  type="number"
                  min="0"
                  max="100"
                  onChange={(e) => setScore(e.target.value)}
                  value={score}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="average">Average</Label>
                <Input
                  id="average"
                  placeholder="Type average"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  onChange={(e) => setAverage(e.target.value)}
                  value={average}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="top30% average">Top 30% average</Label>
                <Input
                  id="top30% average"
                  placeholder="Type top 30% average"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  onChange={(e) => {
                    setTopThirtyAverage(e.target.value);
                  }}
                  value={topThirtyAverage}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleAnalyze}>Analyze Score</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="multi">
          <Card className="h-[400px]">
            <CardContent className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl h-[400px] flex justify-center items-center">
                Unsupported Yet
              </h1>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
