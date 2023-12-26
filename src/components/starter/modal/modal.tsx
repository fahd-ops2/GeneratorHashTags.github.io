import { component$, type Signal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
export default component$((props: { show: Signal<boolean> }) => {
  const { show } = props;

  return (
    <Modal bind:show={show} class="container container-dark">
      <ModalHeader>
        <h2 class="container-center">Error</h2>
      </ModalHeader>
      <ModalContent>
        <p>please add some words</p>
      </ModalContent>
      <ModalFooter class="container-center">
        <button onClick$={() => (show.value = false)} class="button button-dark">Cancel</button>
        <button onClick$={() => (show.value = false)} class="button">Save Changes</button>
      </ModalFooter>
    </Modal>
  );
});