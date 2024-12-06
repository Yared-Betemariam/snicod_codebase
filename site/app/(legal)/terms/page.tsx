/* eslint-disable react/no-unescaped-entities */
import { websiteMail, websiteName } from "@/lib/config";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of services",
};

const page = () => {
  return (
    <div className="legal-content">
      <h1>Terms of Service</h1>
      <p className="mb-6 text-zinc-600">Last updated: 10/4/2024</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to Snicod, a desktop application developed by Yared Betemariam's
        individual company ("we", "us", or "our"). Snicod allows users to
        download the app and save code snippets locally on their computers for
        later use. These terms and conditions ("Terms") govern your use of
        Snicod and any related services, including updates, enhancements, and
        support ("Services").
      </p>

      <h2>2. Acceptance of Terms</h2>
      <p>
        By accessing or using Snicod or any Services, you agree to be bound by
        these Terms. If you do not agree to these Terms, you may not use the
        application or Services.
      </p>

      <h2>3. License</h2>
      <p>
        We grant you a non-exclusive, non-transferable, revocable license to use
        Snicod for your personal or commercial use, subject to these Terms. The
        app is provided on an "as is" basis, and we make no warranties or
        representations regarding its functionality or suitability for your
        particular purposes.
      </p>
      <p>
        If you purchase a valid license, we will provide you with automatic
        updates, subject to your compliance with these Terms. You are
        responsible for ensuring that your installation is compatible with
        updates.
      </p>

      <h2>4. Intellectual Property</h2>
      <p>
        All intellectual property rights in Snicod, including trademarks,
        copyrights, and patents, are owned by us or our licensors. You agree not
        to reproduce, modify, distribute, or create derivative works based on
        the app or Services without our prior written consent.
      </p>

      <h2>5. Payment</h2>
      <p>
        Snicod is available for purchase through third-party payment processors.
        We do not store your payment information. Payments for licenses are
        handled securely by these third-party services.
      </p>

      <h2>6. Refunds</h2>
      <p>
        All sales of Snicod are final. Since you are purchasing a digital
        product, refunds will not be granted unless:
      </p>
      <ul>
        <li>
          The product is not as described on our website or contains a major
          defect.
        </li>
        <li>
          The issue has not been resolved after contacting our support team
          within a reasonable timeframe.
        </li>
      </ul>
      <p>
        Refund requests must be submitted via email within 14 days of purchase.
      </p>

      <h2>7. Automatic Updates</h2>
      <p>
        We provide automatic updates to customers with a valid license. We
        cannot guarantee the availability or timeliness of updates, and we are
        not responsible for any damages caused by delayed or failed updates.
      </p>

      <h2>8. Support and Maintenance</h2>
      <p>
        We provide support and maintenance through our website or email. We make
        no guarantees regarding response times or issue resolution, but we will
        make reasonable efforts to provide timely support.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the extent permitted by law, we are not liable for any damages
        arising from your use of Snicod or Services. Our liability is limited to
        the amount paid for the app or Services.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to indemnify and hold us harmless from any claims or damages
        arising from your use of Snicod or Services, or your violation of these
        Terms.
      </p>

      <h2>11. Modification and Termination</h2>
      <p>
        We may modify these Terms or terminate your use of Snicod at any time.
        Your continued use of the app constitutes your acceptance of any
        modifications.
      </p>

      <h2>12. Governing Law</h2>
      <p>
        These Terms will be governed by and construed in accordance with the
        laws of Morocco, without regard to its conflict of law provisions..
      </p>

      <h2>13. Entire Agreement</h2>
      <p>
        These Terms constitute the entire agreement between you and us regarding
        the use of Snicod and supersede all prior agreements.
      </p>

      <h2>14. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <Link href={`mailto:${websiteMail}`} className="underline">
          {websiteMail}
        </Link>
        .
      </p>
    </div>
  );
};
export default page;
