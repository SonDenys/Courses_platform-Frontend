const items = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
  { id: 4, name: "Course 4" },
];

export interface MyListTabs {
  id: number;
  name?: string;
}

export default function MyListContainers() {
  return (
    <ul role="list" className="space-y-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="bg-white border-2 shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
