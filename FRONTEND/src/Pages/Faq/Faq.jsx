import React, { useState } from "react";

const faq = [
  {
    id: 1,
    question: "  What is your return policy?",
    answar: `If you're not satisfied with your purchase, we accept returns
                within 30 days of delivery. To initiate a return, please email
                us at support@myecommercestore.com with your order number and a
                brief explanation of why you're returning the item.`,
  },
  {
    id: 2,
    question: "    How do I track my order?",
    answar: `  You can track your order by clicking the tracking link in your
                shipping confirmation email, or by logging into your account on
                our website and viewing the order details.`,
  },
  {
    id: 3,
    question: "    How do I contact customer support?",
    answar: ` You can contact our customer support team by emailing us at
                support@myecommercestore.com, or by calling us at (555) 123-4567
                between the hours of 9am and 5pm EST, Monday through Friday.`,
  },
  {
    id: 4,
    question: "    Can I change or cancel my order?",
    answar: ` Unfortunately, once an order has been placed, we are not able to
                make changes or cancellations. If you no longer want the items
                you've ordered, you can return them for a refund within 30 days
                of delivery.`,
  },
  {
    id: 5,
    question: "  Do you offer international shipping?",
    answar: `   Currently, we only offer shipping within the United States.`,
  },
  {
    id: 6,
    question: "  What payment methods do you accept?",
    answar: `  We accept visa,mastercard,paypal payment method also we have
                cash on delivery system.`,
  },
];
const Faq = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleToggleTab = tab => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };
  return (
    <div className="py-8 section">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">FAQ</h2>
      <div className="mx-auto space-y-4">
        {faq.map((item, index) => {
          return (
            <div className="pb-4 border-b border-gray-200" key={index}>
              <button
                onClick={() => handleToggleTab(item.id)}
                className="flex items-center justify-between w-full"
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                {item.id === activeTab ? (
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {item.id === activeTab ? (
                <div className="mt-4">
                  <p className="text-base text-gray-500">{item.answar}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
