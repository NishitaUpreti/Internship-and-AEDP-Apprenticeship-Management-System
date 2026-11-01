import Link from "next/link";

export default function Student(){
    let recentOpportunities = [
        {id:1, jobTitle:"Frontend Developer Intern", companyName:"Google", place:"Bangalore", status:"Under Review", date:"28 Oct 2026"},
        {id:2, jobTitle:"Backend Developer Intern", companyName:"Microsoft", place:"Hyderabad", status:"Accepted", date:"25 Oct 2026"},
        {id:3, jobTitle:"UI/UX Design Intern", companyName:"Adobe", place:"Noida", status:"Pending", date:"22 Oct 2026"}
    ]
    let upcomingDeadlines = [
        {id: 1, title: "Submit Internship Report", dueDate: "5 Nov 2026", daysLeft: 4},
        {id: 2, title: "Log Weekly Hours", dueDate: "7 Nov 2026", daysLeft: 6},
        {id: 3, title: "Faculty Review", dueDate: "10 Nov 2026", daysLeft: 9}
    ]
    return(
        <div  className="flex flex-col gap-8 w-full max-w-[1600px]">

            {/* Welcome:- */}
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-white">Good Morning, Abcd!</h2>
                <p className="text-sm text-gray-400">Your efforts today build a strong future tomorrow.</p>
            </div>

            {/* statistics:- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Applied Opportunities</p>
                    <p className="text-3xl font-semibold text-white">12</p>
                </div>
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Ongoing Internships</p>
                    <p className="text-3xl font-semibold text-white">12</p>
                </div>
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Total Hours Logged</p>
                    <p className="text-3xl font-semibold text-white">12</p>
                </div>
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
                    <p className="text-sm text-gray-400">Credits Earned</p>
                    <p className="text-3xl font-semibold text-white">12</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* recent opportunities */}
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-white">Recent Opportunities</p>
                        <Link href="/student/applications" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                            View All</Link>
                    </div>

                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#252525] border border-white/5">
                        {recentOpportunities.map((obj)=>{
                                    return(
                                        <div key={obj.id} className="flex flex-col gap-3 p-4 rounded-xl bg-[#252525] border border-white/5 hover:border-orange-500/30 transition-colors">
                                            <p className="text-sm font-semibold text-white">{obj.jobTitle}</p>
                                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                                <p>{obj.companyName}</p>
                                                <p>{obj.place}</p>
                                            </div>
                                            <p className="text-xs font-medium px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 w-fit">{obj.status}</p>
                                            <p className="text-xs text-gray-500">{obj.date}</p>
                                        </div> 
                                    )
                                })
                        }
                    
                    </div>
                </div>


                {/* Upcoming Deadlines */}
                <div className="bg-[#1c1c1c] border border-white/10 rounded-xl p-5 flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-white">Upcoming Deadlines</p>
                        <Link href="/student/deadlines" className="text-sm text-orange-400 hover:text-orange-300 transition-colors">
                            View All</Link>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-lg bg-[#252525] border border-white/5">
                        {upcomingDeadlines.map((obj)=>{
                            return(
                                
                                <div key={obj.id} className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#252525] border border-white/5 hover:border-orange-500/30 transition-colors">
                                    <div>
                                        <p className="text-xs text-gray-400 mt-1">{obj.dueDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">{obj.title}</p>
                                        <p className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-3 py-2 rounded-lg whitespace-nowrap">Due in {obj.daysLeft} days</p>
                                    </div>
                                </div>
                            )
                        })}
                            
                       
                    </div>

                </div>

            </div>

            {/* Browse Opportunities */}
            <div className="bg-gradient-to-r from-[#3b2416] to-[#1c1c1c] border border-orange-500/20 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5">
                <div className="flex flex-col gap-2">
                    <p className="text-xl font-semibold text-white">Explore more opportunities</p>
                    <p className="text-sm text-gray-400">Discover internships, apprentenceships and more tailored for you</p>
                </div>
                <Link href="/student/opportunities" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                    Browse Opportunities</Link>
            </div>

        </div>
    )
}
