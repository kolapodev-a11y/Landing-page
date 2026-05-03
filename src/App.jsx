import { useEffect, useRef, useState } from 'react'

const navLinks = [
  ['Features', 'features'],
  ['How It Works', 'how-it-works'],
  ['Pricing', 'pricing'],
  ['Testimonials', 'testimonials'],
]

const featureData = [
  {
    icon: '🤖',
    title: 'AI-Powered Automation',
    desc: 'Describe your workflow in plain English and let NexaFlow build the triggers, actions, and conditions for you.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    desc: 'Run millions of events with ultra-low latency so every workflow feels instant and dependable.',
  },
  {
    icon: '🔗',
    title: '500+ Integrations',
    desc: 'Connect Slack, Notion, GitHub, Stripe, Salesforce, and the tools your team already relies on.',
  },
  {
    icon: '🛡️',
    title: 'Enterprise Security',
    desc: 'Protect every workflow with encryption, audit trails, granular permissions, and compliance-ready controls.',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    desc: 'Track uptime, savings, workflow performance, and team impact from a single command center.',
  },
  {
    icon: '🌍',
    title: 'Global Edge Network',
    desc: 'Deploy close to your users worldwide and keep automations running fast at any scale.',
  },
]

const steps = [
  {
    num: '01',
    icon: '🔌',
    title: 'Connect Your Tools',
    desc: 'Choose the apps you already use and authenticate in seconds with a polished guided setup.',
  },
  {
    num: '02',
    icon: '🧠',
    title: 'Define Your Logic',
    desc: 'Use the drag-and-drop builder or simply tell the AI what outcome you want to automate.',
  },
  {
    num: '03',
    icon: '🚀',
    title: 'Launch and Scale',
    desc: 'Turn the workflow on, monitor the impact, and scale from a tiny team to enterprise volume.',
  },
]

const statsData = [
  { value: 12000, suffix: '+', label: 'Teams using NexaFlow' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
  { value: 500, suffix: '+', label: 'App integrations' },
  { value: 10, suffix: 'x', label: 'Average productivity boost' },
]

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: '/mo',
    tag: '',
    desc: 'Perfect for individuals and small projects getting started with automation.',
    features: ['5 active workflows', '1,000 tasks per month', '50+ integrations', 'Email support', 'Basic analytics'],
    cta: 'Get Started Free',
    featured: false,
  },
  {
    name: 'Pro',
    price: 29,
    period: '/mo',
    tag: 'Most Popular',
    desc: 'Built for fast-growing teams that want more power, collaboration, and visibility.',
    features: ['Unlimited workflows', '100,000 tasks per month', '500+ integrations', 'Priority support', 'Advanced analytics', 'Team collaboration', 'Custom domains'],
    cta: 'Start Pro Trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    period: '/mo',
    tag: '',
    desc: 'For large-scale operations with security, compliance, and infrastructure guarantees.',
    features: ['Everything in Pro', 'Unlimited tasks', 'Dedicated infrastructure', '24/7 support', 'SLA guarantee', 'SSO and SAML', 'Custom contracts'],
    cta: 'Contact Sales',
    featured: false,
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO @ Luminary AI',
    avatar: '👩‍💻',
    text: 'NexaFlow cut our engineering overhead by 60%. We automated our notification and reporting pipeline in a single afternoon.',
  },
  {
    name: 'Marcus Webb',
    role: 'Founder @ Rocketship',
    avatar: '👨‍🚀',
    text: 'The AI workflow builder feels magical. I described the process in plain English and the system mapped the whole automation for me.',
  },
  {
    name: 'Priya Patel',
    role: 'Head of Ops @ ScaleUp',
    avatar: '👩‍🎨',
    text: 'We tried multiple automation products. NexaFlow is the first one that kept up with our growth without becoming a maintenance burden.',
  },
  {
    name: 'James O\'Connor',
    role: 'VP Engineering @ DataStream',
    avatar: '👨‍💼',
    text: 'We went from zero workflows to 200+ in a week. The ROI showed up almost immediately in time saved and incidents prevented.',
  },
]

function useTypingEffect(words, speed = 90, pause = 1700) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    const timeout = setTimeout(() => {
      if (!deleting) {
        const nextText = current.slice(0, charIndex + 1)
        setText(nextText)
        if (nextText.length === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIndex((value) => value + 1)
        }
      } else {
        const nextText = current.slice(0, Math.max(charIndex - 1, 0))
        setText(nextText)
        if (charIndex <= 1) {
          setDeleting(false)
          setWordIndex((value) => (value + 1) % words.length)
          setCharIndex(0)
        } else {
          setCharIndex((value) => value - 1)
        }
      }
    }, deleting ? speed / 2 : speed)

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, pause, speed, wordIndex, words])

  return text
}

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return [ref, visible]
}

function useCountUp(target, start, duration = 1800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return undefined

    let frameId = 0
    let startTime = 0

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(target * progress)
      if (progress < 1) frameId = window.requestAnimationFrame(step)
    }

    frameId = window.requestAnimationFrame(step)
    return () => window.cancelAnimationFrame(frameId)
  }, [duration, start, target])

  return count
}

function Reveal({ children, className = '', delay = 0 }) {
  const [ref, visible] = useInView()

  return (
    <div
      ref={ref}
      className={`${className} transition duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ tag, title, emphasis, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="section-tag">{tag}</span>
      <h2 className="mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title} {emphasis ? <span className="gradient-text">{emphasis}</span> : null}
      </h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{description}</p> : null}
    </div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? 'border-white/10 bg-slate-950/85 shadow-2xl shadow-slate-950/50 backdrop-blur-xl'
            : 'border-white/5 bg-white/5 backdrop-blur-md'
        }`}
      >
        <a href="#hero" className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-white">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-lg shadow-lg shadow-violet-500/20">
            ⚡
          </span>
          <span>NexaFlow</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map(([label, id]) => (
            <a key={id} href={`#${id}`} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {label}
            </a>
          ))}
          <a href="#pricing" className="btn-primary px-5 py-3 text-sm">
            Get Started Free
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="text-lg">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/50 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a href="#pricing" className="btn-primary mt-2 justify-center text-sm" onClick={() => setMenuOpen(false)}>
              Get Started Free
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Hero() {
  const typedText = useTypingEffect(['Automate Everything.', 'Ship 10x Faster.', 'Work Smarter.', 'Scale Infinitely.'])

  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[5%] top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-[6%] top-32 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_35%),linear-gradient(to_bottom,rgba(2,6,23,0.25),rgba(2,6,23,0.9))]" />
      </div>

      <div className="section-shell grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="relative">
          <div className="inline-flex items-center gap-3 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 shadow-lg shadow-violet-500/10">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.8)]" />
            Now with GPT-4o integration · Try it free
          </div>

          <h1 className="mt-8 max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            AI built to
            <span className="mt-3 block min-h-[1.2em] gradient-text">
              {typedText}
              <span className="ml-1 inline-block animate-pulse text-cyan-300">|</span>
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            NexaFlow connects your apps, removes repetitive work, and turns manual busywork into reliable AI-powered systems your team can trust.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#pricing" className="btn-primary justify-center sm:justify-start">
              Start for Free
              <span aria-hidden="true">→</span>
            </a>
            <a href="#how-it-works" className="btn-secondary justify-center sm:justify-start">
              ▶ Watch Demo
            </a>
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex -space-x-3">
              {['👩‍💻', '👨‍🚀', '👩‍🔬', '👨‍💼', '👩‍🎨'].map((avatar) => (
                <span
                  key={avatar}
                  className="grid h-12 w-12 place-items-center rounded-full border border-slate-900/70 bg-gradient-to-br from-slate-200 to-slate-100 text-lg shadow-lg"
                >
                  {avatar}
                </span>
              ))}
            </div>
            <p className="text-sm text-slate-300 sm:text-base">
              <span className="font-bold text-white">12,000+</span> teams already growing with NexaFlow
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          <div className="glass-card relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.25),transparent_30%)]" />
            <div className="relative">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-sm font-medium text-slate-300">NexaFlow Dashboard</span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ['↑ 94%', 'Efficiency'],
                  ['10x', 'Faster output'],
                  ['∞', 'Automations'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="gradient-text text-2xl font-black">{value}</div>
                    <div className="mt-1 text-sm text-slate-400">{label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <div className="flex h-40 items-end gap-3">
                  {[85, 62, 91, 74, 88, 55, 96].map((height, index) => (
                    <div key={height + index} className="flex-1 rounded-full bg-slate-900/80 p-1">
                      <div
                        className="w-full rounded-full bg-gradient-to-t from-cyan-400 via-indigo-400 to-violet-500 shadow-[0_0_18px_rgba(99,102,241,0.45)] transition-all duration-700"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-300">
                {['Collect', 'Analyze', 'Automate', 'Deploy'].map((node, index) => (
                  <div key={node} className="flex items-center gap-3">
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">{node}</span>
                    {index < 3 ? <span className="text-cyan-300">→</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, desc, index }) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <article className="glass-card h-full p-6 sm:p-7">
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/20 text-2xl ring-1 ring-white/10">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{desc}</p>
      </article>
    </Reveal>
  )
}

function Features() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            tag="Features"
            title="Everything you need to"
            emphasis="automate at scale"
            description="Powerful tools built for modern teams that demand speed, reliability, and intelligence in one polished platform."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureData.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StepCard({ step, index, showConnector }) {
  return (
    <Reveal delay={index * 120} className="relative h-full">
      <article className="glass-card relative h-full p-6 sm:p-8">
        <span className="text-sm font-bold uppercase tracking-[0.3em] text-violet-300">{step.num}</span>
        <div className="mt-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10">
          {step.icon}
        </div>
        <h3 className="mt-5 text-2xl font-bold text-white">{step.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{step.desc}</p>
        {showConnector ? (
          <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-px w-16 -translate-y-1/2 bg-gradient-to-r from-violet-400/70 to-cyan-300/0 xl:block" />
        ) : null}
      </article>
    </Reveal>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            tag="How It Works"
            title="Up and running in"
            emphasis="under 5 minutes"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard key={step.num} step={step} index={index} showConnector={index < steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ value, suffix, label, delay }) {
  const [ref, visible] = useInView({ threshold: 0.3 })
  const count = useCountUp(value, visible, 1800)
  const display = Number.isInteger(value) ? Math.round(count).toLocaleString() : count.toFixed(1)

  return (
    <div
      ref={ref}
      className={`rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center backdrop-blur-xl transition duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="gradient-text text-4xl font-black sm:text-5xl">{visible ? display : '0'}{suffix}</div>
      <p className="mt-3 text-sm font-medium text-slate-300 sm:text-base">{label}</p>
    </div>
  )
}

function StatsSection() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="section-shell rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-xl sm:px-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={index * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingCard({ plan, annual, index }) {
  const price = annual && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price

  return (
    <Reveal delay={index * 110} className="h-full">
      <article
        className={`glass-card relative flex h-full flex-col p-6 sm:p-8 ${
          plan.featured ? 'ring-2 ring-violet-400/70 shadow-[0_0_40px_rgba(139,92,246,0.24)]' : ''
        }`}
      >
        {plan.tag ? (
          <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-950">
            {plan.tag}
          </span>
        ) : null}
        <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
        <div className="mt-6 flex items-end gap-1">
          <span className="text-xl font-semibold text-slate-400">$</span>
          <span className="gradient-text text-5xl font-black">{price}</span>
          <span className="pb-1 text-sm text-slate-400">{plan.period}</span>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{plan.desc}</p>
        <ul className="mt-8 space-y-3 text-sm text-slate-200 sm:text-base">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/20 text-xs text-emerald-300">
                ✓
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <a href="#" className={`${plan.featured ? 'btn-primary' : 'btn-secondary'} mt-8 justify-center`}>
          {plan.cta}
        </a>
      </article>
    </Reveal>
  )
}

function Pricing() {
  const [annual, setAnnual] = useState(false)

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            tag="Pricing"
            title="Simple, transparent"
            emphasis="pricing for everyone"
            description="Choose the plan that fits your team today and scale up whenever you are ready."
          />
        </Reveal>

        <Reveal delay={100} className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-300 backdrop-blur-xl">
            <span className={!annual ? 'font-semibold text-white' : ''}>Monthly</span>
            <button
              type="button"
              onClick={() => setAnnual((value) => !value)}
              className={`relative h-8 w-16 rounded-full transition ${annual ? 'bg-violet-500' : 'bg-slate-700'}`}
              aria-label="Toggle billing period"
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${annual ? 'left-9' : 'left-1'}`}
              />
            </button>
            <span className={annual ? 'font-semibold text-white' : ''}>
              Annual <em className="rounded-full bg-emerald-400/15 px-2 py-1 text-xs not-italic text-emerald-300">Save 20%</em>
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} annual={annual} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, active, onClick, index }) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <button
        type="button"
        onClick={onClick}
        className={`glass-card h-full w-full p-6 text-left transition ${
          active ? 'border-violet-400/60 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.16)]' : 'hover:-translate-y-1'
        }`}
      >
        <div className="text-amber-300">★★★★★</div>
        <p className="mt-5 text-sm leading-7 text-slate-200 sm:text-base">“{testimonial.text}”</p>
        <div className="mt-6 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-xl">{testimonial.avatar}</span>
          <div>
            <div className="font-semibold text-white">{testimonial.name}</div>
            <div className="text-sm text-slate-400">{testimonial.role}</div>
          </div>
        </div>
      </button>
    </Reveal>
  )
}

function Testimonials() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((value) => (value + 1) % testimonials.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <section id="testimonials" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading tag="Testimonials" title="Loved by" emphasis="12,000+ teams" />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              active={index === active}
              onClick={() => setActive(index)}
              index={index}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              className={`h-3 rounded-full transition ${index === active ? 'w-10 bg-violet-400' : 'w-3 bg-white/20'}`}
              aria-label={`View testimonial ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABanner() {
  return (
    <section className="px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-32">
      <div className="section-shell">
        <Reveal>
          <div className="glass-card relative overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute -right-6 bottom-0 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to <span className="gradient-text">transform</span> your workflow?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Join thousands of teams automating the future. Start free today with no credit card required.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a href="#pricing" className="btn-primary justify-center">
                  Start for Free — It&apos;s Free
                </a>
                <a href="#" className="btn-secondary justify-center">
                  Schedule a Demo
                </a>
              </div>
              <p className="mt-6 text-sm text-slate-400">✓ No credit card · ✓ 14-day Pro trial · ✓ Cancel anytime</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  const columns = {
    Product: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'],
    Resources: ['Documentation', 'API Reference', 'Status Page', 'Community', 'Tutorials'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
  }

  return (
    <footer className="border-t border-white/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
        <div>
          <a href="#hero" className="flex items-center gap-3 text-lg font-extrabold tracking-tight text-white">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-lg text-slate-950">
              ⚡
            </span>
            <span>NexaFlow</span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400 sm:text-base">
            AI-powered workflow automation for modern teams. Build, deploy, and scale reliable systems without code.
          </p>
          <div className="mt-6 flex gap-3">
            {['𝕏', '💼', '🐙', '▶️'].map((item) => (
              <a
                key={item}
                href="#"
                className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-violet-400/50 hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(columns).map(([title, items]) => (
          <div key={title}>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">{title}</h3>
            <ul className="mt-5 space-y-3">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-300 transition hover:text-white sm:text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-shell mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 NexaFlow, Inc. All rights reserved.</p>
        <p>Built with React, Vite, and Tailwind CSS.</p>
      </div>
    </footer>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!show) return null

  return (
    <button
      type="button"
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-slate-900/90 text-lg text-white shadow-2xl shadow-slate-950/50 backdrop-blur-xl transition hover:-translate-y-1"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <StatsSection />
        <Pricing />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
