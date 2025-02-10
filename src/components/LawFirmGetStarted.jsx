import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
    const navigate = useNavigate(); 
  useEffect(() => {
    document.title = "Get Started - Bigtortsupport.ai";
    window.scrollTo(0, 0);
  });

  const handleButtonClick = (event, route) => {
    navigate(route);
    //closeMenu();
    if(event!=null)event.preventDefault();
  };

  return (
    <>
      <section id="get-started" className="text-content page-content-container">
        <article>
          <h1>Revolutionizing Mass Tort Case Management with AI</h1>
          <p>
            At <strong>BigTortSupport.ai</strong>, we provide large mass tort law firms with AI-powered automation to streamline client communication, data gathering, and case management. Our platform is built to handle the complexities of large-scale litigation, ensuring efficiency, accuracy, and seamless integration with your existing workflows.
          </p>

          <h3>Why Large Mass Tort Firms Need BigTortSupport.ai</h3>
          <p>
            Managing thousands of clients across multiple campaigns requires constant communication, precise data handling, and reliable client engagement. Missed updates, outdated contact information, and incomplete client fact sheets can slow case progress and create inefficiencies. Our AI-driven platform automates these critical tasks, allowing your firm to focus on litigation strategy rather than administrative burdens.
          </p>

          <h3>What We Offer</h3>

          <h4>1. AI-Driven Client Communication & Contact Management</h4>
          <ul>
            <li>
              <strong>SMS Authorization Campaigns:</strong> Secure SMS consent from clients via firm-branded email campaigns that direct clients to a firm-hosted landing page with a link to our portal.
            </li>
            <li>
              <strong>Ongoing Contact Verification:</strong> Monthly or quarterly SMS check-ins validate client contact details to ensure accurate communication.
            </li>
            <li>
              <strong>Multi-Channel Outreach for Unresponsive Clients:</strong> If SMS fails, our system automatically escalates to email, social media, and direct mail (with firm-approved branding and language).
            </li>
          </ul>

          <h4>2. Automated Client Fact Sheet Completion</h4>
          <ul>
            <li>
              <strong>AI-Powered Data Collection:</strong> Complex fact sheet questions are broken into discrete SMS prompts for easy client responses.
            </li>
            <li>
              <strong>Real-Time AI Processing:</strong> Client responses are compiled into structured fact sheets for seamless case management.
            </li>
            <li>
              <strong>Web-Based Portal Alternative:</strong> Clients who prefer can complete fact sheets via a secure online portal instead of SMS.
            </li>
          </ul>

          <h4>3. Document Collection & Management</h4>
          <ul>
            <li>
              Request and receive photos of key documents directly from clients via SMS or the web portal.
            </li>
            <li>
              AI categorization and integration ensure documents are properly tagged and stored for case use.
            </li>
          </ul>

          <h4>4. Mass Messaging for Campaign Updates</h4>
          <ul>
            <li>
              Send case updates, deadlines, and reminders via SMS and email to thousands of clients at once.
            </li>
            <li>
              AI-driven message scheduling minimizes SMS fatigue by spacing out communications optimally.
            </li>
          </ul>

          <h4>5. Seamless Integration with Your Case Management System</h4>
          <p>
            Our system pushes all collected data directly into Filevine, Clio, Salesforce, or any other case management software you use. If an API does not already exist, we will develop one at no additional cost.
          </p>

          <h4>6. Future Expansion: AI-Powered Interrogatory Responses</h4>
          <p>
            Soon, our platform will automate interrogatory responses by breaking down complex legal questions into simple client prompts via SMS and portal. Your firm will gain access at a fraction of the cost of traditional solutions.
          </p>

          <h3>Why Leading Mass Tort Firms Trust BigTortSupport.ai</h3>
          <p>
            Automate thousands of client interactions with AI-driven workflows. Reduce staff workload while improving client responsiveness. Ensure client data is always up to date for depositions and settlements. Seamlessly integrate with your existing case management system. Enhance mass messaging, document collection, and legal fact gathering.
          </p>

          <p>
            Power your mass tort practice with the efficiency of AI. <strong>Contact us today</strong> to schedule a demo and see how BigTortSupport.ai can transform your firm’s case management.
          </p>

          <button className="primary-btn" onClick={(e) => handleButtonClick(e, "/Pricing")}>
            Get Pricing Details
          </button>
        </article>
      </section>
    </>
  );
};

export default GetStarted;