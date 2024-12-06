/* eslint-disable react/no-unescaped-entities */
// import {
//   websiteMail as mail,
//   websiteName as name,
//   websiteLink as link,
// } from "@/data/website";

import { websiteLink, websiteMail } from "@/lib/config";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
};
const page = () => {
  return (
    <div className="legal-content">
      <h1>Privacy Policy</h1>
      <p className="mb-6 text-zinc-600">Last updated: 10/4/2024</p>

      <p>
        Your privacy is very important to us. At Snicod, we are committed to
        protecting your personal information and ensuring transparency in how we
        handle your data. This Privacy Policy explains how we collect, use, and
        safeguard the information when you use our desktop application.
      </p>

      <h2>1. Data Collection and Use</h2>
      <p>
        Snicod is a code snippet management tool that you can download by
        purchasing a license.{" "}
        <strong>
          All the data you save within Snicod, including code snippets, is
          stored locally on your device.
        </strong>
        We do not access, process, or transmit your stored data to any external
        servers or third parties.
      </p>

      <h3>Personal Information</h3>
      <p>
        We don’t collect personal information unless it’s truly necessary. You
        may provide some personal information (such as an email address) during
        the purchase or licensing process. This information is used solely for
        completing the purchase and delivering the app to you.
      </p>

      <h3>How We Collect Your Data</h3>
      <ul>
        <li>
          <strong>Purchase Information:</strong> When you purchase Snicod, we
          collect information such as your name, email address, and payment
          details for processing your transaction.
        </li>
        <li>
          <strong>License Activation:</strong> Once purchased, your license key
          will be used to activate the app locally on your computer. (Internet
          connection is required to activate it)
        </li>
      </ul>

      <h2>2. Local Data Storage</h2>
      <p>
        All the data you save within Snicod is stored{" "}
        <strong>locally on your device</strong>. We do not have access to your
        code snippets, settings, or other information stored within the app.
      </p>

      <h2>3. Cookies and Analytics</h2>
      <p>
        Snicod is a desktop application and operates offline, so it does not use
        cookies or any tracking technologies within the app itself. However, our
        website,{" "}
        <Link href={websiteLink} className="underline">
          {websiteLink}
        </Link>
        , may use cookies for purposes like processing purchases or analyzing
        website traffic.
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        Snicod does not share your personal information with third parties,
        except as required for the purchase process. We use the following
        third-party services for handling purchases:
      </p>
      <ul>
        <li>
          <Link
            target="_blank"
            className="underline"
            href="https://gumroad.com/"
          >
            <strong>Lemon Squeezy, Inc</strong>
          </Link>{" "}
          – used to process payments and ensure secure transactions.
        </li>
      </ul>

      <h2>5. Data Security</h2>
      <p>
        We take your privacy seriously and use industry-standard measures to
        protect your personal information. However, please note that no method
        of transmission over the internet or electronic storage is 100% secure,
        and we cannot guarantee absolute security.
      </p>

      <h2>6. Compliance with Laws</h2>
      <p>
        We do not share your personal information with anyone except to comply
        with the law, develop our products, or protect our rights.
      </p>

      <h2>7. Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time to reflect changes in
        our practices or applicable laws. Any updates will be posted on our
        website, and the effective date will be revised at the top of the
        policy.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or Snicod’s
        practices, please contact us at{" "}
        <Link href={`mailto:${websiteMail}`} className="underline">
          {websiteMail}
        </Link>
        .
      </p>
    </div>
  );
};
export default page;
