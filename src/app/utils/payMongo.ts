


export   async function payMongoBooking(amountInput : string, sender : string, receiver : string, bookingId : string) {
    const secret_key = process.env.NEXT_PUBLIC_PAYMONGO;
    // Convert to centavos
    const amount = parseInt(amountInput, 10) * 100;

    console.log(secret_key)
   
    if (amount < 2000) {
      alert("Invalid Amount - The minimum is ₱20");
      return;
    }
  
    // Generate a unique reference ID
    const referenceId = `transaction_${Date.now()}`;
  
    const bodyData = {
      data: {
        attributes: {
          line_items: [
            {
              name: "Test Order",
              quantity: 1,
              amount: amount,
              currency: "PHP",
            },
          ],
          payment_method_types: ["gcash", "paymaya", "card"],
          success_url: `http://localhost:3000/pages/client/payment?sender=${sender}&receiver=${receiver}&bookingId=${bookingId}&amount=${amountInput}&refId=${referenceId}`,

          cancel_url: `http://localhost:3000/pages/client/posts`,
          metadata: {
            reference_id: referenceId,
          },
        },
      },
    };
  
    try {
      const response = await fetch("https://api.paymongo.com/v1/checkout_sessions", {
        method: "POST",
        headers: {
          "Authorization": "Basic " + btoa(secret_key + ":"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("HTTP Error:", response.status, result);
        alert("Failed to create checkout session");
        return;
      }
  
      if (result.data?.attributes?.checkout_url) {
        // Redirect user to PayMongo checkout page
        window.location.href = result.data.attributes.checkout_url;
      } else {
        console.error("Unexpected result:", result);
        alert("Error creating checkout session");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  }
  