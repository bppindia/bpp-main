import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function MembersTab() {
  return (
    <Tabs defaultValue="tab-1" className="w-full">
      <ScrollArea className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground w-max sm:w-full flex-nowrap flex">
            <TabsTrigger
              value="tab-1"
              className="relative text-gray-700 bg-gray-100 after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-200 hover:text-gray-900 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 flex-shrink-0 px-4"
            >
              NATIONAL EXECUTIVE <br /> COMMITTEE
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="relative text-gray-700 bg-gray-100 after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-200 hover:text-gray-900 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 flex-shrink-0 px-4"
            >
              STATE EXECUTIVE <br /> COMMITTEE
            </TabsTrigger>
            <TabsTrigger
              value="tab-3"
              className="relative text-gray-700 bg-gray-100 after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-200 hover:text-gray-900 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 flex-shrink-0 px-4"
            >
              DISTRICT EXECUTIVE<br /> COMMITTEE
            </TabsTrigger>
            <TabsTrigger
              value="tab-4"
              className="relative text-gray-700 bg-gray-100 after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-200 hover:text-gray-900 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 flex-shrink-0 px-4"
            >
              BLOCK EXECUTIVE<br /> COMMITTEE
            </TabsTrigger>
            <TabsTrigger
              value="tab-5"
              className="relative text-gray-700 bg-gray-100 after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-gray-200 hover:text-gray-900 data-[state=active]:bg-gray-200 data-[state=active]:text-gray-900 flex-shrink-0 px-4"
            >
              PANCHAYAT/MUNICIPAL WARD<br /> EXECUTIVE COMMITTEE
            </TabsTrigger>
          </TabsList>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <Card className="flex max-w-5xl mx-auto flex-col justify-between text-left bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
              NATIONAL EXECUTIVE COMMITTEE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm list-decimal list-inside text-gray-700 ">
              <li className="flex items-center gap-2">
                <span>1. President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Vice President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>3. General Secretary - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>4. Secretary - 18</span>
              </li>
              <li className="flex items-center gap-2">
                <span>5. Addl. Secretary - 28</span>
              </li>
              <li className="flex items-center gap-2">
                <span>6. Treasurer - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>7. Members - 150</span>
              </li>
            </ol>
          </CardContent>
        </Card>

      </TabsContent>
      <TabsContent value="tab-2">
        <Card className="flex max-w-5xl mx-auto flex-col justify-between text-left bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
              STATE EXECUTIVE COMMITTEE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm list-decimal list-inside text-gray-700 ">
              <li className="flex items-center gap-2">
                <span>1. President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Vice President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>3. General Secretary - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>4. Secretary - 12</span>
              </li>
              <li className="flex items-center gap-2">
                <span>5. Addl. Secretary - 17</span>
              </li>
              <li className="flex items-center gap-2">
                <span>6. Treasurer - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>7. Members - 100</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab-3">
        <Card className="flex max-w-5xl mx-auto flex-col justify-between text-left bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
              DISTRICT EXECUTIVE COMMITTEE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm list-decimal list-inside text-gray-700 ">
              <li className="flex items-center gap-2">
                <span>1. President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Vice President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>3. General Secretary - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>4. Secretary - 05</span>
              </li>
              <li className="flex items-center gap-2">
                <span>5. Addl. Secretary - 08</span>
              </li>
              <li className="flex items-center gap-2">
                <span>6. Treasurer - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>7. Members - 50</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab-4">
        <Card className="flex max-w-5xl mx-auto flex-col justify-between text-left bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
              BLOCK EXECUTIVE COMMITTEE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm list-decimal list-inside text-gray-700 ">
              <li className="flex items-center gap-2">
                <span>1. President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Vice President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>3. General Secretary - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>4. Secretary - 02</span>
              </li>
              <li className="flex items-center gap-2">
                <span>5. Addl. Secretary - 04</span>
              </li>
              <li className="flex items-center gap-2">
                <span>6. Treasurer - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>7. Members - 30</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab-5">
        <Card className="flex max-w-5xl mx-auto flex-col justify-between text-left bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-2">
              PANCHAYAT/MUNICIPAL WARD EXECUTIVE COMMITTEE
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm list-decimal list-inside text-gray-700 ">
              <li className="flex items-center gap-2">
                <span>1. President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>2. Vice President - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>3. General Secretary - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>4. Treasurer - 01</span>
              </li>
              <li className="flex items-center gap-2">
                <span>5. Members - 10</span>
              </li>
            </ol>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export { MembersTab };

