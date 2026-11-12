// Day 136
// AI-assisted Tailwind styling workflow with strict component constraints

function Day136() {
    return (
        <div>
            <TaskCard title="Deploy Smart Contract" priority="High" isDone={false} />
        </div>
    )
}

function TaskCard({ title, priority, isDone }: { title: string; priority: string; isDone: boolean }) {
    return (
        <div className="flex flex-col w-full md:flex-row md:items-center md:justify-between gap-4 p-6 bg-black text-white border border-white rounded-xl">
            <h3 className="text-lg font-semibold tracking-tight text-white border-b border-amber-400 pb-1">
                {title}
            </h3>
            <span className="bg-amber-400 text-black text-sm font-medium p-2 rounded-md">
                Priority: {priority}
            </span>
            <p className="bg-amber-400 text-black text-sm font-medium p-2 rounded-md">
                Status: {isDone ? "Completed" : "In Progress"}
            </p>
            <button
                onClick={() => console.log("click")}
                className="bg-white text-black text-sm font-medium px-4 py-2 rounded-md border border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer"
            >
                Mark as Done
            </button>
        </div>
    );
}

export default Day136;