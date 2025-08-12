import "./App.css";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from './components/Column.jsx';
import { useState } from "react";
export default function App() {
  const initialData = [
    { id: "Column1",
      title: "TO DO",
      cards: [
        { id: "Card1", title: "task1" },
        { id: "Card2", title: "task2" },
      ],
    },
    { id: "Column2",
      title: "IN PROGRESS",
      cards: [
        { id: "Card3", title: "task3" },
        { id: "Card4", title: "task4" },
      ],
    },
    {
      id:"Column3",
      title: "COMPLETE",
      cards:[
        {id:"Card5",title:"task5"},
      ]
    }
  ];
  const [columns, setColumns] = useState(initialData);
  const findColumn = (unique) => {
    if (!unique) return null;
    if (columns.some((c) => c.id === unique)) {
      return columns.find((c) => c.id === unique) ?? null;
    }
    const id = String(unique);
    const itemWithColumnId = columns.flatMap((c) =>
      c.cards.map((i) => ({ itemId: i.id, columnId: c.id }))
    );
    const columnId = itemWithColumnId.find((i) => i.itemId === id)?.columnId;
    return columns.find((c) => c.id === columnId) ?? null;
  };
  function getNewCardIndex(overItems, overIndex, deltaY) {
    const putOnBelowLastItem = overIndex === overItems.length - 1 && deltaY > 0;
    const modifier = putOnBelowLastItem ? 1 : 0;
    return overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
  }
  function updateColumnsOnDragOver(prevState, activeColumn, overColumn, activeId, delta) {
    const activeItems = activeColumn.cards;
    const overItems = overColumn.cards;
    const activeIndex = activeItems.findIndex((i) => i.id === activeId);
    const overIndex = overItems.findIndex((i) => i.id === String(overColumn.id) ? null : activeId);
    const insertIndex = getNewCardIndex(overItems, overIndex, delta.y);
    return prevState.map((c) => {
      if (c.id === activeColumn.id) {
        return {
          ...c,
          cards: activeItems.filter((i) => i.id !== activeId),
        };
      } else if (c.id === overColumn.id) {
        return {
          ...c,
          cards: [
            ...overItems.slice(0, insertIndex),
            activeItems[activeIndex],
            ...overItems.slice(insertIndex),
          ],
        };
      } else {
        return c;
      }
    });
  }
  const handleDragOver = (event) => {
    const { active, over, delta } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn === overColumn) return;
    setColumns((prevState) =>
      updateColumnsOnDragOver(prevState, activeColumn, overColumn, activeId, delta)
    );
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeId = String(active.id);
    const overId = over ? String(over.id) : null;
    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);
    if (!activeColumn || !overColumn || activeColumn !== overColumn) return;
    const activeIndex = activeColumn.cards.findIndex((i) => i.id === activeId);
    const overIndex = overColumn.cards.findIndex((i) => i.id === overId);
    if (activeIndex !== overIndex) {
      setColumns((prevState) =>
        prevState.map((column) => {
          if (column.id === activeColumn.id) {
            column.cards = arrayMove(overColumn.cards, activeIndex, overIndex);
            return column;
          } else {
            return column;
          }
        })
      );
    }
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const handleAddTask = (columnId, task) => {
     setColumns((prev) =>
      prev.map((col) =>
         col.id === columnId
           ? { ...col, cards: [...col.cards, { id: Date.now().toString(), ...task }] }
           : col
       )
     );
   };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="App" style={{ display: "flex", flexDirection: "row", padding: "20px" }}>
        {columns.map((column) => (
          <Column
            key={column.id}
            id={column.id}
            title={column.title}
            cards={column.cards}
            onAddTask={handleAddTask}
          />
        ))}
      </div>
    </DndContext>
  );
}
