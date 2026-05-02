/**
 * Utility for unified API interaction with the Flux backend.
 */

export async function createCheckout(serviceId: string, price: number = 25000) {
  try {
    const response = await fetch('/api/payments/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, price }),
    });
    
    const data = await response.json();
    if (data.url) {
      if (data.isMock) {
        console.info("PROTOTYPE MODE: Stripe is not configured. Redirecting to mock success page.");
      }
      window.location.href = data.url;
    } else {
      throw new Error(data.message || data.error || 'Failed to initialize checkout');
    }
  } catch (error) {
    console.error('Payment Error:', error);
    alert('Payment system unavailable. Check console for details.');
  }
}

export async function dispatchAudit(to: string, serviceId: string, auditData: any) {
  try {
    const response = await fetch('/api/email/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to,
        subject: `[ACTION REQUIRED] Flux Technical Audit: ${serviceId}`,
        html: `<h3>Flux Agency Growth Audit</h3><p>Findings for ${serviceId}:</p><pre>${JSON.stringify(auditData, null, 2)}</pre>`
      }),
    });
    const data = await response.json();
    if (data.isMock) {
      console.info("PROTOTYPE MODE: Email dispatch simulated. Configure SENDGRID_API_KEY for live delivery.");
    }
    return data;
  } catch (error) {
    console.error('Email Error:', error);
  }
}

/**
 * Force clear all local application data (Storage, Cache, Service Workers)
 */
export async function clearSystemStorage() {
  console.log("Flux System: Initiating deep storage purge...");

  // 1. Clear Storage
  localStorage.clear();
  sessionStorage.clear();

  // 2. Clear Caches
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
  }

  // 3. Unregister Service Workers
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map(r => r.unregister()));
  }

  // 4. Note on Cookies
  console.info("Flux System: Application state cleared. Manual cookie clearing recommended via Browser Settings if issues persist.");
  
  // 5. Reload
  window.location.reload();
}
