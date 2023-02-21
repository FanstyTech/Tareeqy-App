using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class iii : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SchoolProfiles_Agreements_AgreementId",
                table: "SchoolProfiles");

            migrationBuilder.AlterColumn<int>(
                name: "AgreementId",
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

            migrationBuilder.AddForeignKey(
                name: "FK_SchoolProfiles_Agreements_AgreementId",
                table: "SchoolProfiles",
                column: "AgreementId",
                principalTable: "Agreements",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SchoolProfiles_Agreements_AgreementId",
                table: "SchoolProfiles");

            migrationBuilder.AlterColumn<int>(
                name: "AgreementId",
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
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6563));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "d14a408e-d14f-4a68-b18a-e734a2127d2d", "AQAAAAIAAYagAAAAEDtzrSozOkBU7opX9u7WJS2H14r17bHwAkWIt4c+b0OVQhB8bkGqYbrVW0gRNSBb8Q==", "3093aa61-5351-48d5-ac21-a09a80c4ac85" });

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6521));

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6526));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6450));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6452));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6453));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6454));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6455));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6443));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6446));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6402));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6419));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6420));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6421));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6458));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6461));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6462));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 16, 13, 27, 31, 872, DateTimeKind.Local).AddTicks(6462));

            migrationBuilder.AddForeignKey(
                name: "FK_SchoolProfiles_Agreements_AgreementId",
                table: "SchoolProfiles",
                column: "AgreementId",
                principalTable: "Agreements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
