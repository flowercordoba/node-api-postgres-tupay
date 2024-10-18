
# Flujo para el Proceso de Payin

## Descripción
El proceso de payin permite a los usuarios realizar pagos a través de diferentes métodos y proveedores, generando una factura asociada a la transacción. Este flujo incluye los endpoints necesarios y sus respectivas descripciones.

## Flujo de Proceso de Payin

1. **Inicio del Proceso de Payin**:
   - El usuario solicita realizar un pago.

2. **Generar Transacción**:
   - Se crea una nueva transacción con el tipo `payin`.
   - **Endpoint**: `POST /api/payin`
   - **Parámetros**:
     - `amount`: Monto a pagar.
     - `user_id`: ID del usuario que realiza el pago.
     - `provider_id`: ID del proveedor a utilizar.
     - `currency`: Moneda en la que se realiza el pago.
     - `reference`: Referencia única para la transacción.
   - **Respuesta**:
     - Transacción creada con éxito, incluye `transaction_id`.

3. **Generar Factura**:
   - Al crear la transacción, se genera automáticamente una factura asociada.
   - **Factura**:
     - `invoice_number`: Número de factura único.
     - `transaction_id`: ID de la transacción asociada.
     - `amount`: Monto de la factura (igual al monto de la transacción).
     - `status`: Estado inicial de la factura (pendiente).
   - **Endpoint**: `POST /api/invoices` (opcional si se genera automáticamente).
   - **Parámetros**: (como se describió en la transacción).
   - **Respuesta**: 
     - Factura creada con éxito, incluye `invoice_id`.

4. **Notificación al Proveedor**:
   - Se notifica al proveedor para procesar el pago.
   - **Endpoint**: `POST /api/providers/{provider_id}/pay`
   - **Parámetros**:
     - `transaction_id`: ID de la transacción.
   - **Respuesta**:
     - Confirmación de que el proveedor ha recibido la solicitud.

5. **Actualizar Estado de Transacción y Factura**:
   - Cuando el proveedor confirma el pago:
     - Actualizar el estado de la transacción a `paid`.
     - Actualizar el estado de la factura a `paid`.
   - **Endpoint**: `PUT /api/payin/{transaction_id}` y `PUT /api/invoices/{invoice_id}`.
   - **Parámetros**: 
     - `status`: nuevo estado.
   - **Respuesta**:
     - Confirmación de que la transacción y la factura han sido actualizadas.

6. **Finalización**:
   - El proceso de payin se completa y se retorna la información de la transacción y la factura.
