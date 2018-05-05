export const showModal = (src, title, desc) => ({
  type: 'SHOW_MODAL',
  src,
  title,
  desc
});

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
});