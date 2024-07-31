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
  const [score, setScore] = useState<number>();
  const [average, setAverage] = useState<number>();
  const [topThirtyAverage, setTopThirtyAverage] = useState<number>();
  const scoreSchema = z.number().int().min(0).max(100);
  const twoDecimalPlaces = (value: number) => {
    const decimalPart = value.toString().split(".")[1];
    return decimalPart ? decimalPart.length <= 2 : true;
  };
  const averageSchema = z.number().min(0).max(100).refine(twoDecimalPlaces, {
    message: "Value must have at most two decimal places",
  });
  const topThirtyAverageSchema = z
    .number()
    .min(average ?? 0)
    .max(100)
    .refine(twoDecimalPlaces, {
      message: "Value must have at most two decimal places",
    });
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        ILE Score Analyzer
      </h1>
      <Tabs defaultValue="account" className=" m-12 w-1000pxr">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">One score</TabsTrigger>
          <TabsTrigger value="multi">Multiple Scores</TabsTrigger>
        </TabsList>
        <TabsContent value="single">
          <Card className=" h-400pxr flex justify-center flex-col">
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
                  onChange={(e) => {
                    setScore(parseInt(e.target.value));
                  }}
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
                  onChange={(e) => {
                    setAverage(parseInt(e.target.value));
                  }}
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
                  onChange={(e) => {
                    setTopThirtyAverage(parseInt(e.target.value));
                  }}
                  value={topThirtyAverage}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Analyze Score</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="multi">
          <Card className="h-400pxr ">
            <CardContent className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl h-400pxr flex justify-center items-center">
                Unsupportted Yet
              </h1>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
