<template>
  <div>
    <div class="landing">
      <Header />

      <div class="container">
        <h1>Data Use Policy</h1>

        <p>
          This Data Use Policy ("Policy") outlines how Our Company ("Our," "Us," or "We")
          collects, uses, and protects the data and information you provide when using our
          services or visiting our website. Please read this Policy carefully to
          understand how we handle your data.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect various types of information, including but not limited to:</p>
        <ul>
          <li>Personal information (e.g., name, email address, contact information)</li>
          <li>Usage data (e.g., IP address, browser type, device information)</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We may use your information for purposes such as:</p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Personalizing your experience</li>
          <li>Communicating with you</li>
          <li>Protecting our rights and interests</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We may share your information with third parties in certain circumstances, such
          as:
        </p>
        <ul>
          <li>With your consent</li>
          <li>For legal or regulatory compliance</li>
          <li>With service providers who help us deliver our services</li>
        </ul>

        <h2>4. Security</h2>
        <p>
          We take reasonable measures to protect your data, but please be aware that no
          method of data transmission or storage is completely secure. We cannot guarantee
          the security of your data.
        </p>

        <h2>5. Your Choices</h2>
        <p>
          You have certain rights regarding your data, including the right to access,
          correct, or delete your information. You can exercise these rights by contacting
          us.
        </p>

        <h2>6. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to collect and store
          information about your usage of our website. You can manage your cookie
          preferences through your browser settings.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          Our services are not intended for children under the age of 13. We do not
          knowingly collect personal information from children under 13. If you believe we
          have collected information from a child under 13, please contact us.
        </p>

        <h2>8. Changes to this Policy</h2>
        <p>
          We may update this Policy from time to time. Any changes will be posted on this
          page with an updated "Last Updated" date. Please review this Policy
          periodically.
        </p>


        <h2>9. Acceptance of this Policy</h2>
        <p>
          By using our services or visiting our website, you signify your acceptance of
          this Data Use Policy. If you do not agree with the terms of this Policy, please
          do not use our services or provide your information.
        </p>

        <p>This Data Use Policy was last updated on October 18, 2023.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
h1 {
  font-size: #{scaleValue(25)};
}

h2 {
  font-size: #{scaleValue(20)};
}

p {
  font-size: 16px;
  line-height: 1.5;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  color: $font-black;
  padding-top: 100px;
}
</style>
