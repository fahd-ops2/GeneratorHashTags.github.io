import { component$, type QwikIntrinsicElements, type Signal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';
import styles from "../views/views.module.css";
export default component$((props: { show: Signal<boolean> }) => {
  // Directly use the show signal passed from the parent component
  const { show } = props;

  return (
    <Modal bind:show={show} class="container container-dark">
      <ModalHeader>
        <h2 class="container-center">Edit Profile</h2>
      </ModalHeader>
      <ModalContent>
        <p>You can update your profile here. Hit the save button when finished.</p>
        <div>
          <label for="name" class="container-flex">Name</label>
          <input id="name" type="text" placeholder="John Doe" class={styles.wordInput} />
        </div>
        <div>
          <label for="email" class="container-flex">Email</label>
          <input id="email" type="text" placeholder="johndoe@gmail.com" class={styles.wordInput} />
        </div>
      </ModalContent>
      <ModalFooter class="container-center">
        <button onClick$={() => (show.value = false)} class="button button-dark">Cancel</button>
        <button onClick$={() => (show.value = false)} class="button">Save Changes</button>
      </ModalFooter>
      <button onClick$={() => (show.value = false)} style="position: absolute; top: 10px; right: 10px; background: none; border: none;">
        <CloseIcon />
      </button>
      <div class="ellipsis"></div>
    </Modal>
  );
});


export function CloseIcon(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props} key={key}>
      <path
        fill="currentColor"
        d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
      ></path>
    </svg>
  );
}
