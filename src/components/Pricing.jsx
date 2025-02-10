import React, { useEffect } from "react";

const Pricing = () => {
  useEffect(() => {
    document.title = "Pricing - Bigtortsupport.ai";
    window.scrollTo(0, 0);
  });

  return (
    <>
      <section id="pricing" className="text-content page-content-container">
        <article>
          <h1>BigTortSupport.ai Pricing Tiers</h1>
          <p>
            We offer scalable AI-driven solutions designed to meet the unique demands of mass tort law firms, whether you're handling hundreds or tens of thousands of clients in a campaign. Our tiered pricing ensures that you only pay for the level of service you need, with customized API integrations and automation workflows at every level.
          </p>

          <h3>Tier 1: Small-Scale Campaigns (Less than 1,000 Litigants)</h3>
          <ul>
            <li>Perfect for boutique mass tort firms or early-stage campaigns requiring foundational AI automation.</li>
            <li>AI-powered SMS authorization campaigns to secure client consent.</li>
            <li>Quarterly client contact verification via SMS and email.</li>
            <li>Basic AI-driven client fact sheet collection (SMS and web portal).</li>
            <li>Mass messaging for updates (limited volume).</li>
            <li>Secure document submission via SMS and web portal.</li>
            <li>Standard case management software integration (Filevine, Clio, Salesforce, etc.).</li>
            <li>Affordable entry-level pricing for firms scaling up their operations.</li>
          </ul>

          <h3>Tier 2: Mid-Sized Campaigns (1,000 – 5,000 Litigants)</h3>
          <ul>
            <li>Designed for firms handling moderate caseloads across multiple jurisdictions.</li>
            <li>All Tier 1 features, plus:</li>
            <li>Monthly client contact verification via SMS, email, and automated escalation to social media and direct mail for unresponsive clients.</li>
            <li>Expanded mass messaging capabilities (higher-volume SMS/email outreach).</li>
            <li>Enhanced AI-powered fact sheet completion (breaks complex questions into discrete SMS prompts and reassembles responses).</li>
            <li>AI-driven document categorization and case integration.</li>
            <li>Priority API development for non-standard case management software integrations.</li>
            <li>Cost-effective automation for mid-sized firms looking to streamline case management.</li>
          </ul>

          <h3>Tier 3: Large-Scale Campaigns (5,000 – 10,000 Litigants)</h3>
          <ul>
            <li>Ideal for firms managing high-volume national campaigns requiring advanced automation and high-frequency engagement.</li>
            <li>All Tier 2 features, plus:</li>
            <li>Bi-weekly contact verification to ensure up-to-date client information at all times.</li>
            <li>Advanced escalation workflow for unresponsive clients (SMS → Email → Social Media → Direct Mail).</li>
            <li>Dedicated AI messaging optimization to prevent SMS fatigue.</li>
            <li>Customizable mass messaging platform with tailored campaign-specific templates.</li>
            <li>Real-time data sync with your case management system.</li>
            <li>Early access to AI-powered interrogatory response system at no extra cost.</li>
            <li>For firms handling major mass tort litigation, optimizing every client touchpoint.</li>
          </ul>

          <h3>Tier 4: Enterprise-Scale Campaigns (10,000+ Litigants)</h3>
          <ul>
            <li>Built for the largest mass tort firms managing national or multi-district litigation with highly complex workflows.</li>
            <li>All Tier 3 features, plus:</li>
            <li>Real-time continuous contact verification with AI-driven client engagement tracking.</li>
            <li>Custom-built automation rules tailored to firm and case-specific needs.</li>
            <li>Unlimited mass messaging capacity (fully scalable).</li>
            <li>Exclusive AI-powered interrogatory response system with firm-specific training.</li>
            <li>Priority white-glove support with dedicated AI workflow customization.</li>
            <li>Enterprise-level API integrations for large-scale case management solutions.</li>
            <li>Contact us for enterprise-level pricing and customized solutions.</li>
          </ul>

          <p>
            Whether you’re handling hundreds or tens of thousands of litigants, BigTortSupport.ai ensures your firm stays ahead with automation, AI-powered case management, and seamless client communication. Contact us today to discuss pricing and schedule a customized demo for your firm.
          </p>
          <p><strong>CG Legal Technologies, LLC</strong><br/>3217 Atlantic Blvd.<br/>Jacksonville, FL 32207<br/><strong>Email</strong>: <a href="mailto:info@cglegaltech.com">info@cglegaltech.com</a></p>
          

        </article>
      </section>
    </>
  );
};

export default Pricing;