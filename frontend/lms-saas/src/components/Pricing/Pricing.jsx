import { Check } from "lucide-react";
import "./Pricing.css";

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Try the platform and see if it clicks.",
    features: [
      "Access to 12 free courses",
      "Community forum access",
      "Basic progress tracking",
      "Certificate on completion",
    ],
    cta: "Start for free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For learners serious about leveling up.",
    features: [
      "Access to all 400+ courses",
      "Downloadable project files",
      "1:1 mentor feedback",
      "Priority certificate review",
      "Offline lesson downloads",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Team",
    price: "$49",
    period: "per member / month",
    description: "For companies upskilling their team.",
    features: [
      "Everything in Pro",
      "Team progress dashboard",
      "Seat management",
      "Custom learning paths",
      "Dedicated account manager",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="pricing">
      <div className="pricing__inner">
        <div className="pricing__header">
          <span className="pricing__eyebrow">Simple pricing</span>
          <h2 className="pricing__heading">Pricing that grows with you</h2>
          <p className="pricing__subhead">
            Start free, upgrade when you're ready. Cancel anytime, no questions asked.
          </p>
        </div>

        <div className="pricing__grid">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`pricing-card ${plan.featured ? "pricing-card--featured" : ""}`}>
              {plan.featured && <span className="pricing-card__ribbon">Most popular</span>}

              <span className="pricing-card__name">{plan.name}</span>
              <div className="pricing-card__price-row">
                <span className="pricing-card__price">{plan.price}</span>
                <span className="pricing-card__period">{plan.period}</span>
              </div>
              <p className="pricing-card__desc">{plan.description}</p>

              <a href="/signup" className="pricing-card__cta">{plan.cta}</a>

              <ul className="pricing-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}