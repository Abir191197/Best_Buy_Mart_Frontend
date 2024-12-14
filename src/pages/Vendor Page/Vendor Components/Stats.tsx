// Stats.tsx
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
  {
    id: 1,
    name: "Total Subscribers",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: EnvelopeOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Click Rate",
    stat: "24.57%",
    icon: CursorArrowRaysIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Stats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((item) => (
        <div
          key={item.id}
          className="relative overflow-hidden rounded-lg bg-white px-6 py-5 shadow-md"
        >
          <dt>
            <div className="absolute rounded-full bg-indigo-500 p-3">
              <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500">
              {item.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {item.stat}
            </p>
            <p
              className={classNames(
                item.changeType === "increase" ? "text-green-600" : "text-red-600",
                "ml-2 flex items-center text-sm font-semibold"
              )}
            >
              {item.changeType === "increase" ? (
                <ArrowUpIcon
                  className="h-5 w-5 text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ArrowDownIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">
                {item.changeType === "increase" ? "Increased" : "Decreased"} by
              </span>
              {item.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}
