export default function classOrganizer(...classes) {
  return classes.filter(Boolean).join(" ");
}
