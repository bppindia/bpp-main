import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleCheck } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

function MembersTab() {
  return (
    <Tabs defaultValue="tab-1" className="w-full">
      <ScrollArea>
        <TabsList className="mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground w-full">
          <TabsTrigger
            value="tab-1"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex-1"
          >
            President
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex-1"
          >
            Vice President
          </TabsTrigger>
          <TabsTrigger
            value="tab-3"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex-1"
          >
            General Secretary
          </TabsTrigger>
          <TabsTrigger
            value="tab-4"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex-1"
          >
            Treasurer
          </TabsTrigger>
          <TabsTrigger
            value="tab-5"
            className="relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent flex-1"
          >
            Members
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <Card className="flex w-full flex-col justify-between text-left">
          <CardHeader>
            <CardTitle>
              <p>President</p>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Full Party Engagement
            </p>
            <span className="text-4xl font-bold">
              ₹ 250
            </span>
            <p className="text-muted-foreground">
              Annual Fee
            </p>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            <p className="mb-3 text-lg font-semibold">
              Additional Benefits:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>All Primary Membership Benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Digital App Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Access to Community Contribution</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Opportunity to be Nominated for Elections</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab-2">
        <Card className="flex w-full flex-col justify-between text-left">
          <CardHeader>
            <CardTitle>
              <p>Vice President</p>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Full Party Engagement
            </p>
            <span className="text-4xl font-bold">
              ₹ 250
            </span>
            <p className="text-muted-foreground">
              Annual Fee
            </p>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            <p className="mb-3 text-lg font-semibold">
              Additional Benefits:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>All Primary Membership Benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Digital App Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Access to Community Contribution</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Opportunity to be Nominated for Elections</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab-3">
        <Card className="flex w-full flex-col justify-between text-left">
          <CardHeader>
            <CardTitle>
              <p>General Secretory</p>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Full Party Engagement
            </p>
            <span className="text-4xl font-bold">
              ₹ 250
            </span>
            <p className="text-muted-foreground">
              Annual Fee
            </p>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            <p className="mb-3 text-lg font-semibold">
              Additional Benefits:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>All Primary Membership Benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Digital App Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Access to Community Contribution</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Opportunity to be Nominated for Elections</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab-4">
        <Card className="flex w-full flex-col justify-between text-left">
          <CardHeader>
            <CardTitle>
              <p>Treasurer</p>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Full Party Engagement
            </p>
            <span className="text-4xl font-bold">
              ₹ 250
            </span>
            <p className="text-muted-foreground">
              Annual Fee
            </p>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            <p className="mb-3 text-lg font-semibold">
              Additional Benefits:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>All Primary Membership Benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Digital App Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Access to Community Contribution</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Opportunity to be Nominated for Elections</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="tab-5">
        <Card className="flex w-full flex-col justify-between text-left">
          <CardHeader>
            <CardTitle>
              <p>Members</p>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Full Party Engagement
            </p>
            <span className="text-4xl font-bold">
              ₹ 250
            </span>
            <p className="text-muted-foreground">
              Annual Fee
            </p>
          </CardHeader>
          <CardContent>
            <Separator className="mb-6" />
            <p className="mb-3 text-lg font-semibold">
              Additional Benefits:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>All Primary Membership Benefits</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Digital App Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Access to Community Contribution</span>
              </li>
              <li className="flex items-center gap-2">
                <CircleCheck className="size-4" />
                <span>Opportunity to be Nominated for Elections</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export { MembersTab };
