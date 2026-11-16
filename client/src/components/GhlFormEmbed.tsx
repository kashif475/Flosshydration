// GoHighLevel form embed. Submissions go straight from the visitor's browser
// to GoHighLevel (HIPAA add-on); nothing passes through this site or Netlify.
// form_embed.js (loaded in client/index.html) resizes the iframe to fit.
// Form IDs are listed in docs/gohighlevel.md.

type GhlFormEmbedProps = {
  formId: string;
  formName: string;
};

export default function GhlFormEmbed({ formId, formName }: GhlFormEmbedProps) {
  return (
    <div className="hydration-form-shell">
      <iframe
        className="hydration-ghl-form"
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
        id={`inline-${formId}`}
        title={formName}
        loading="lazy"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={formName}
        data-layout-iframe-id={`inline-${formId}`}
        data-form-id={formId}
      />
    </div>
  );
}
