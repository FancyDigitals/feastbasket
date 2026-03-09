import { FEATURES } from "../../constants/features";
import { HOME_CONTENT } from "../../config/homeContent";

const { whyChooseUs } = HOME_CONTENT;

export function WhyChooseUs() {
  return (
    <section className="bg-neutral-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-[#549558]">
            {whyChooseUs.badge}
          </span>
          <h2 className="mb-3 text-3xl font-bold text-neutral-900 sm:text-4xl">
            {whyChooseUs.title}
          </h2>
          <p className="mx-auto max-w-2xl text-neutral-600">{whyChooseUs.subtitle}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-neutral-900">{feature.title}</h3>
              <p className="text-sm text-neutral-600">{feature.description}</p>
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-neutral-100 to-transparent transition-transform group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}