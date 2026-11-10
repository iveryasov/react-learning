// Day 135
// Mobile responsiveness practice

function Day135() {
  return (
    <div className="p-4 text-center">
        <header className="mb-8">
            <h2 className="mb-2">Nexus Cloud — a platform for project management and team collaboration</h2>
            <p>Start for free, upgrade as you grow, and unlock powerful tools to take your productivity to the next level</p>
        </header>
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto">
            <div className="flex flex-col flex-1 bg-slate-200 p-6 border border-green-400 rounded-xl gap-4">
                <h3>Starter</h3>
                <p>$0.00 / month</p>
                <p>Perfect for individuals who want to organize their tasks and manage small projects</p>
                <button>Get Started</button>
                <p className="bg-green-400 text-white p-2 rounded-xl">Free forever</p>
            </div>
            <div className="flex flex-col flex-1 bg-slate-200 p-6 border border-blue-400 rounded-xl gap-4">
                <h3>Pro</h3>
                <p>$19.99 / month</p>
                <p>Designed for growing teams that need advanced tools and seamless collaboration</p>
                <button>Choose Plan</button>
                <p className="bg-blue-400 text-white p-2 rounded-xl">Most popular</p>
            </div>
            <div className="flex flex-col flex-1 bg-slate-200 p-6 border border-purple-400 rounded-xl gap-4">
                <h3>Enterprise</h3>
                <p>$99.99 / month</p>
                <p>Built for large organizations that require maximum performance, security, and control</p>
                <button>Choose Plan</button>
                <p className="bg-purple-400 text-white p-2 rounded-xl">Full experience</p>
            </div>
        </div>
    </div>
  );
}

export default Day135;