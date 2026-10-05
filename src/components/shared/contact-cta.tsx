import { formatWhatsAppUrl, whatsAppMessage } from "@/lib/utils";

/** CTA final compartido. `projectName` personaliza el mensaje de WhatsApp. */
export function ContactCTA({ projectName }: { projectName?: string }) {
  return (
    <section
      id="contacto"
      className="pb-[clamp(80px,10vw,140px)] pt-[clamp(96px,13vw,200px)]"
    >
      <div className="wrap flex flex-col gap-[clamp(32px,4vw,48px)]">
        <h2 className="max-w-[1100px] text-balance font-serif text-[clamp(46px,7.6vw,120px)] font-light leading-[0.98] tracking-[-0.025em]">
          ¿Tenés un espacio para transformar?
        </h2>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          <a
            href={formatWhatsAppUrl(whatsAppMessage(projectName))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink h-14 gap-[14px] px-[30px]"
          >
            Hablar por WhatsApp <span aria-hidden>→</span>
          </a>
          <span className="text-[14px] text-arq-stone">
            Diseño 3D sin cargo · Render en 48–72 hs · Instalación incluida
          </span>
        </div>
      </div>
    </section>
  );
}
