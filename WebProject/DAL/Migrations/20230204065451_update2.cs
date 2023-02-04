using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class update2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FileSize",
                table: "Attachments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "4736ab42-405a-425b-9f75-923f351d2e1a", "AQAAAAIAAYagAAAAEGHWPRh9teZRr7dZQcnWO8dNanza+R/3knvmH0cuV0AgFvp5YFXzxk9HVanzaNq4Eg==", "ddb7cfa0-f594-40de-b589-0e8e5cb12e71" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileSize",
                table: "Attachments");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "02174cf0–9412–4cfe-afbf-59f706d72cf6",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "52948b0d-d5c6-4681-98ef-209132c94d20", "AQAAAAIAAYagAAAAEHorUVE/IADM+YnOhTP5SviujtJJVYcXOi1hHnlK7oQU+cv4YX5BVrOlpUpB84k+BA==", "5790859c-b127-4c1b-965a-9034b198e90e" });
        }
    }
}
