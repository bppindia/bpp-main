// src/pages/dashboard/goals/index.tsx
import { Main } from "@/components/layout/dashboard/main";
import { Card, CardContent } from "@/components/ui/card";
import { goals } from './data/goals';
import { Link } from 'react-router-dom';

const GoalsPage = () => {
  return (
    <Main fixed>
      <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {goals.map((goal) => (
          <Link
            key={goal.number}
            to={`/dashboard/goal/${goal.number}`} 
            className="block"
          >
            <Card
              className={`${goal.bgColor} text-white hover:scale-105 transition-transform duration-200 cursor-pointer overflow-hidden`}
            >
              <CardContent className="p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center p-3">
                    <span className="mr-2 text-2xl font-bold">{goal.number}</span>
                  </div>
                  <div className="flex flex-col items-center p-4 text-center">
                    <div className="mb-3">
                      <goal.icon size={40} color={goal.iconColor} />
                    </div>
                    <h3 className="mb-2 text-sm font-bold leading-tight">
                      {goal.title}
                    </h3>
                    <p className="text-xs opacity-90">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </Main>
  );
};

export default GoalsPage;