# Design System (UI Primitives)

Primitives live under `components/ui/`. Use these in feature components only; no domain logic here.

- **button** – Primary, secondary, ghost, destructive; optional `loading` state.
- **card** – Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter.
- **modal** – Modal, ModalPortal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalClose, ModalTrigger.
- **input** – Text input with focus ring and disabled state.
- **label** – Form labels.
- **avatar** – Avatar, AvatarImage, AvatarFallback (initials when no image).
- **badge** – Tags and status (default, secondary, destructive, outline, success, warning).

Theme is controlled via CSS variables in `app/globals.css` (light/dark and radius).
