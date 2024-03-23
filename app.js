let deferredPrompt; // Declare deferredPrompt variable globally
const customInstallPrompt = document.getElementById('custom-install-prompt');
const installButton = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Show the custom install prompt
  customInstallPrompt.style.display = 'block';
});

installButton.addEventListener('click', () => {
  // Hide the custom install prompt
  customInstallPrompt.style.display = 'none';

  // Prompt the user to install the app
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Reset the deferred prompt variable
      deferredPrompt = null;
    });
  }
});
