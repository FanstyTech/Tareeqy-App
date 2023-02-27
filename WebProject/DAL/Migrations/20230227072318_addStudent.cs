using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class addStudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LicenseTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LicenseTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SchoolStudents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    licenseTypeId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    SchoolProfileId = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeleterUserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorUserId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolStudents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolStudents_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SchoolStudents_LicenseTypes_licenseTypeId",
                        column: x => x.licenseTypeId,
                        principalTable: "LicenseTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SchoolStudents_SchoolProfiles_SchoolProfileId",
                        column: x => x.SchoolProfileId,
                        principalTable: "SchoolProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Agreements",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2252));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "39f4727f-f8f8-4f09-8825-524f6e4698f4", "AQAAAAIAAYagAAAAEHCXOuZWAxuPYQ+cNVh1fvPEfoVyt9A2xDmoBGvE9qLvBVcEDf/FOcsKaPA0rNqUQg==", "67bd15a1-bab4-449f-bebf-0b875ea5d470" });

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2236));

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2240));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2197));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2200));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2202));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2202));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2203));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2189));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2192));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2120));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2131));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2132));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2133));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2208));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2210));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2211));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 27, 9, 23, 17, 947, DateTimeKind.Local).AddTicks(2211));

            migrationBuilder.InsertData(
                table: "LicenseTypes",
                columns: new[] { "Id", "Cost", "CreationTime", "CreatorUserId", "DeleterUserId", "DeletionTime", "IsActive", "IsDeleted", "Name" },
                values: new object[,]
                {
                    { 1, 700m, new DateTime(2023, 2, 27, 9, 23, 17, 988, DateTimeKind.Local).AddTicks(5458), null, null, null, true, false, "ملاكي شفوي" },
                    { 2, 800m, new DateTime(2023, 2, 27, 9, 23, 17, 988, DateTimeKind.Local).AddTicks(5465), null, null, null, true, false, "ملاكي تحريري " },
                    { 3, 900m, new DateTime(2023, 2, 27, 9, 23, 17, 988, DateTimeKind.Local).AddTicks(5466), null, null, null, true, false, "تجاري شفوي" },
                    { 4, 900m, new DateTime(2023, 2, 27, 9, 23, 17, 988, DateTimeKind.Local).AddTicks(5467), null, null, null, true, false, "تجاري تحريري" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_SchoolStudents_licenseTypeId",
                table: "SchoolStudents",
                column: "licenseTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolStudents_SchoolProfileId",
                table: "SchoolStudents",
                column: "SchoolProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolStudents_UserId",
                table: "SchoolStudents",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchoolStudents");

            migrationBuilder.DropTable(
                name: "LicenseTypes");

            migrationBuilder.UpdateData(
                table: "Agreements",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3297));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "0db4a0ec-bd68-4c70-8bd7-1acff760b33f", "AQAAAAIAAYagAAAAEAM8jb9s+wfgaCdZVDCckN3lv6M3aSm54wqiYtrukgdkYe4YMPltxbp3T+m+lWnPxA==", "ca8cf1d0-5e5a-49ad-82af-31fe71ae12ae" });

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3280));

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3284));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3238));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3241));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3243));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3244));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3245));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3231));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3234));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3195));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3206));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3208));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3209));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3248));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3251));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3252));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 26, 13, 24, 21, 248, DateTimeKind.Local).AddTicks(3253));
        }
    }
}
