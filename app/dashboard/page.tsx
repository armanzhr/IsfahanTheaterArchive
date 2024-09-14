import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChartComponent } from "./_components/bar-chart";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChartBetter } from "./_components/bar-chart-better";

export default async function Dashboard() {
  return (
    <div className="h-[calc(100dvh-100px)] flex items-center justify-center w-full">
      سلام خوش آمدید
    </div>
  );
}
