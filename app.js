let deferredPrompt; // Declare deferredPrompt variable globally

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Trigger the installation prompt when the user clicks anywhere on the page
  document.addEventListener('click', installApp);
});

function installApp() {
  // Ensure that the deferredPrompt is available and prompt the user
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
  // Remove the event listener after triggering the prompt
  document.removeEventListener('click', installApp);
}
