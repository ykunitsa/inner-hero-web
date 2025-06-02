import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockExposures = [
  {
    id: "1",
    title: "Fear of public speaking",
    description: "Practice speaking in front of small groups.",
  },
  {
    id: "2",
    title: "Fear of dogs",
    description: "Start by looking at pictures of dogs.",
  },
  {
    id: "3",
    title: "Fear of elevators",
    description: "Stand near an elevator for a few minutes.",
  },
];

export default function ExposuresPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Exposures</h1>
        <Link href="/techniques/exposures/new">
          <Button>Add New Exposure</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockExposures.map((exposure) => (
          <Link key={exposure.id} href={`/techniques/exposures/${exposure.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{exposure.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {exposure.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
