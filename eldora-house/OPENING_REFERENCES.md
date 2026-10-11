# Door and window references

Stable IDs refer to the modelled first-floor openings. Names use the provisional
room map; IDs remain unchanged if rooms are renamed. Coordinates are global plan
metres, rear-left origin, X right and Z toward street.

| ID    | Name                                   | Type    | Start X/Z       | End X/Z         |
| ----- | -------------------------------------- | ------- | --------------- | --------------- |
| WIN01 | Living area — garden fixed window      | window  | 4.575 / 1.225   | 6.055 / 1.225   |
| WIN02 | Rear room — garden-side window         | window  | 3.225 / 0.000   | 3.225 / 2.025   |
| DR01  | Living area — garden sliding doors     | sliding | 6.175 / 1.225   | 10.000 / 1.225  |
| WIN03 | Rear room — left window                | window  | 0.000 / 1.000   | 0.000 / 2.400   |
| WIN04 | Service room — left window             | window  | 0.000 / 4.500   | 0.000 / 5.100   |
| WIN05 | Side room — left window                | window  | 0.000 / 7.300   | 0.000 / 8.300   |
| WIN06 | Kitchen — left window                  | window  | 0.000 / 11.000  | 0.000 / 12.500  |
| DR03  | Rear room to stair passage             | door    | 2.180 / 4.000   | 3.030 / 4.000   |
| DR04  | Service room to stair passage          | door    | 2.025 / 4.450   | 2.025 / 5.250   |
| DR05  | Side room to stair passage             | door    | 2.025 / 7.250   | 2.025 / 8.050   |
| DR06  | Kitchen — rear passage door            | door    | 2.300 / 9.950   | 3.200 / 9.950   |
| OP01  | Living area to stair passage           | passage | 4.575 / 2.175   | 4.575 / 3.175   |
| DR07  | Kitchen to living area                 | door    | 4.575 / 10.450  | 4.575 / 11.350  |
| WIN07 | Kitchen — garage-facing window         | window  | 1.250 / 15.000  | 3.350 / 15.000  |
| WIN08 | Living area — rear right window        | window  | 10.000 / 3.425  | 10.000 / 5.425  |
| WIN09 | Living area — front right window       | window  | 10.000 / 7.325  | 10.000 / 9.825  |
| WIN10 | Front side room — right window         | window  | 10.000 / 12.625 | 10.000 / 13.725 |
| DR02  | Entrance hall — terrace sliding doors  | sliding | 4.825 / 14.350  | 7.925 / 14.350  |
| DR08  | Entrance hall to front side room       | door    | 8.350 / 12.200  | 9.150 / 12.200  |
| WIN11 | Front side room — garage-facing window | window  | 8.500 / 15.625  | 9.700 / 15.625  |

## Sliding leaves

DR01: DR01-A, DR01-B, DR01-C, DR01-D (drawing-left to drawing-right).

DR02: DR02-A, DR02-B, DR02-C, DR02-D (drawing-left to drawing-right).

DR01-A and DR01-D stay fixed; DR01-B and DR01-C slide outward. DR02 is the front
terrace assembly, whose operation remains unconfirmed. References describe the
current interpretation, not a verified architectural opening schedule. Removed
front entrance and gate are excluded.

Use the Door / window IDs checkbox to show markers. Focus opening locates a
reference. The sidebar lists all names. Source records are in model.ts (garden)
and house-model.ts (house); openings.ts combines them into one registry.
