import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  LifeBuoy,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Send,
  TicketCheck,
} from "lucide-react";

export const metadata = {
  title: "Help Desk | WorkLedger",
};

const QUICK_LINKS = [
  {
    icon: BookOpen,
    title: "Browse FAQs",
    description: "Answers to the most common student questions.",
    href: "#faqs",
  },
  {
    icon: TicketCheck,
    title: "Track a Ticket",
    description: "Check the status of a ticket you already raised.",
    href: "#track",
  },
  {
    icon: MessageSquare,
    title: "Contact Support",
    description: "Reach the placement cell during working hours.",
    href: "#raise-ticket",
  },
];

const FAQS = [
  {
    question: "How do I log my internship hours?",
    answer:
      "Open Log Hours from the sidebar, choose the date and project, then enter the hours worked. Your industry supervisor verifies each entry before it counts toward your credits.",
  },
  {
    question: "Why is my application still under review?",
    answer:
      "Employers usually respond within 7–10 working days. If the status has not changed after that, raise a ticket with the job title and the date you applied.",
  },
  {
    question: "How are credits calculated?",
    answer:
      "Credits are mapped from verified hours using the university credit framework. Your faculty supervisor reviews and approves the final credit award.",
  },
  {
    question: "I cannot sign in to my account.",
    answer:
      "Use the Forgot Password link on the login page. If your university email is not recognised, contact the placement cell so they can check your enrolment record.",
  },
  {
    question: "How do I update my resume?",
    answer:
      "Go to My Profile, open the Resume & Documents card and use Upload. The newest resume is marked as Primary and attached to future applications.",
  },
];

export default function StudentHelpPage() {
  return (
    <div className="flex w-full max-w-[1400px] flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/student" className="transition-colors hover:text-orange-400">
          Dashboard
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-gray-300">Help Desk</span>
      </nav>

      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1c1c1c] p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,138,80,0.18),transparent_55%)]" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10 text-orange-400">
              <LifeBuoy className="h-5 w-5" />
            </span>
            <h1 className="mt-4 text-2xl font-semibold text-white">Help Desk</h1>
            <p className="mt-1.5 text-sm text-gray-400">
              Find an answer, track a request, or raise a ticket with the placement
              cell.
            </p>
          </div>

          <Link
            href="#raise-ticket"
            className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <Send className="h-4 w-4" />
            Raise a Ticket
          </Link>
        </div>

        <div className="relative mt-5 flex items-center rounded-xl border border-white/10 bg-[#252525] px-4">
          <Search className="h-4 w-4 shrink-0 text-gray-500" />
          <input
            type="search"
            placeholder="Search help articles, e.g. log hours, credits, resume..."
            className="h-11 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder-gray-500"
          />
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {QUICK_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.title}
              href={item.href}
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-[#1c1c1c] p-4 transition-colors hover:border-orange-500/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-sm font-medium text-white">
                  {item.title}
                  <ChevronRight className="h-3.5 w-3.5 text-gray-600 transition-colors group-hover:text-orange-400" />
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-gray-500">
                  {item.description}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        {/* FAQs */}
        <section
          id="faqs"
          className="scroll-mt-6 rounded-2xl border border-white/10 bg-[#1c1c1c] xl:col-span-2"
        >
          <div className="flex items-start gap-3 border-b border-white/10 px-5 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Quick answers before you raise a ticket.
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/5 px-5">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-gray-200 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-2 pr-6 text-xs leading-relaxed text-gray-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Support + track */}
        <div className="flex flex-col gap-6">
          <section className="rounded-2xl border border-white/10 bg-[#1c1c1c] p-5">
            <h2 className="text-sm font-semibold text-white">Contact support</h2>
            <p className="mt-1 text-xs text-gray-500">
              Placement cell, Student Services Block.
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <a
                href="mailto:placement@university.edu"
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#252525] px-4 py-3 transition-colors hover:border-orange-500/30"
              >
                <Mail className="h-4 w-4 shrink-0 text-orange-400" />
                <span className="min-w-0">
                  <span className="block text-gray-200">placement@university.edu</span>
                  <span className="block text-gray-500">Replies within 1 working day</span>
                </span>
              </a>

              <a
                href="tel:+911352460000"
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#252525] px-4 py-3 transition-colors hover:border-orange-500/30"
              >
                <Phone className="h-4 w-4 shrink-0 text-orange-400" />
                <span className="min-w-0">
                  <span className="block text-gray-200">+91 135 246 0000</span>
                  <span className="block text-gray-500">Mon – Fri, 9:00 – 17:00 IST</span>
                </span>
              </a>

              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#252525] px-4 py-3">
                <Clock className="h-4 w-4 shrink-0 text-orange-400" />
                <span>
                  <span className="block text-gray-200">Average response</span>
                  <span className="block text-gray-500">Under 24 hours on working days</span>
                </span>
              </div>
            </div>
          </section>

          <section
            id="track"
            className="scroll-mt-6 rounded-2xl border border-white/10 bg-[#1c1c1c] p-5"
          >
            <h2 className="text-sm font-semibold text-white">Track a ticket</h2>
            <p className="mt-1 text-xs text-gray-500">
              Enter the ticket ID from your confirmation email.
            </p>

            <label className="mt-4 block text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Ticket ID
            </label>
            <div className="mt-1.5 flex items-center rounded-lg border border-white/10 bg-[#252525] px-3 focus-within:border-orange-500/40">
              <FileText className="h-4 w-4 shrink-0 text-gray-500" />
              <input
                type="text"
                placeholder="e.g. WL-10482"
                className="h-10 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder-gray-600"
              />
            </div>

            <button
              type="button"
              className="mt-3 w-full rounded-lg border border-white/10 bg-[#252525] px-4 py-2 text-xs font-medium text-gray-200 transition-colors hover:border-orange-500/40 hover:text-orange-400"
            >
              Check Status
            </button>
          </section>
        </div>
      </div>

      {/* Raise a ticket */}
      <section
        id="raise-ticket"
        className="scroll-mt-6 rounded-2xl border border-white/10 bg-[#1c1c1c]"
      >
        <div className="flex items-start gap-3 border-b border-white/10 px-5 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
            <TicketCheck className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-white">Raise a ticket</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Tell us what happened and we will route it to the right team.
            </p>
          </div>
        </div>

        <form className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Nishita Upreti"
              className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#252525] px-3 text-sm text-white outline-none focus:border-orange-500/40"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              University Email
            </label>
            <input
              type="email"
              defaultValue="nishita.upreti@university.edu"
              className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#252525] px-3 text-sm text-white outline-none focus:border-orange-500/40"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Category
            </label>
            <select className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#252525] px-3 text-sm text-gray-200 outline-none focus:border-orange-500/40">
              <option>Account &amp; access</option>
              <option>Applications</option>
              <option>Internship &amp; hours</option>
              <option>Credits &amp; evaluation</option>
              <option>Documents</option>
              <option>Something else</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Subject
            </label>
            <input
              type="text"
              placeholder="Short summary of the issue"
              className="mt-1.5 h-10 w-full rounded-lg border border-white/10 bg-[#252525] px-3 text-sm text-white outline-none placeholder-gray-600 focus:border-orange-500/40"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
              Describe the issue
            </label>
            <textarea
              rows={4}
              placeholder="Include dates, job titles and anything you have already tried."
              className="mt-1.5 w-full resize-none rounded-lg border border-white/10 bg-[#252525] px-3 py-2.5 text-sm text-white outline-none placeholder-gray-600 focus:border-orange-500/40"
            />
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-gray-500">
              You will receive a ticket ID by email after submitting.
            </p>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <Send className="h-4 w-4" />
              Submit Ticket
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
