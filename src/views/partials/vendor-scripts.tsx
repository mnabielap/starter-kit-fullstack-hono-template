import { FC } from 'hono/jsx';

export const VendorScripts: FC = () => {
  return (
    <>
      {/* Bootstrap 5 Bundle JS (includes Popper) */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      
      {/* SweetAlert2 JS */}
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </>
  );
};