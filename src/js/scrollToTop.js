export default function scrollToTop(where) {
  return where.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
