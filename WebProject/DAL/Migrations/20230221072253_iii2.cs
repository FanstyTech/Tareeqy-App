using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class iii2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CurrencyId",
                table: "SchoolProfiles",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Agreements",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3086));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1f4dd24f-5b1d-49a8-b760-ff84e4e07c09", "AQAAAAIAAYagAAAAEKNou/qw/9BLcW94zMTDWg2iq5+p0jnirfxO6VUMx/1gqZYwUk8h2+JJ5/tzlI6HuQ==", "69ca1940-6a37-444a-aacd-7afb2aec182a" });

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3070));

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3074));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(2999));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3001));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3003));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3003));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3004));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(2991));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(2995));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(2944));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(2962));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(2963));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(2964));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3009));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3010));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3012));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 22, 52, 862, DateTimeKind.Local).AddTicks(3012));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "CurrencyId",
                table: "SchoolProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Agreements",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3947));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "1e886839-1571-43b2-8907-95373bfa65cc", "AQAAAAIAAYagAAAAEKI6RaqnbeGSS2N+wmy/MgRqMNXOdC4xdnUljRF+xQf7YjDNMKb2N+fLVTlRHBjSBg==", "d4e3a65d-6579-4e36-af92-7a564e865568" });

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3931));

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3935));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3852));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3855));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3856));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3857));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3858));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3846));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3850));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3786));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3818));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3820));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3821));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3864));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3867));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3868));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 9, 19, 57, 493, DateTimeKind.Local).AddTicks(3869));
        }
    }
}
