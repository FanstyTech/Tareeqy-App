using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class addWorkingTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SchoolWorkingTimes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Day = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                    table.PrimaryKey("PK_SchoolWorkingTimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolWorkingTimes_SchoolProfiles_SchoolProfileId",
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

            migrationBuilder.CreateIndex(
                name: "IX_SchoolWorkingTimes_SchoolProfileId",
                table: "SchoolWorkingTimes",
                column: "SchoolProfileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SchoolWorkingTimes");

            migrationBuilder.UpdateData(
                table: "Agreements",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5756));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "aa8d05e2-ac84-489d-9301-df0988aa5c2e", "AQAAAAIAAYagAAAAEMgwvHW1fX6kUpVEqGuuyq3QbRd1Oh+JYQZiB73OqcJnOkLUklup0vH/jYhux4g1/Q==", "ad5d8904-4a7c-47be-af3c-05dc46582aa9" });

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5737));

            migrationBuilder.UpdateData(
                table: "Attachments",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5741));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5680));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5682));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5684));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5685));

            migrationBuilder.UpdateData(
                table: "Cities",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5686));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5673));

            migrationBuilder.UpdateData(
                table: "Countries",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5677));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5633));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5646));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5648));

            migrationBuilder.UpdateData(
                table: "Currencies",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5649));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5695));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5698));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5699));

            migrationBuilder.UpdateData(
                table: "Governorates",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreationTime",
                value: new DateTime(2023, 2, 21, 19, 47, 57, 474, DateTimeKind.Local).AddTicks(5700));
        }
    }
}
