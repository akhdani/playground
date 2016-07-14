; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

[Setup]
; NOTE: The value of AppId uniquely identifies this application.
; Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{58B6CF8E-77D2-42B2-907E-737CE55DE652}
AppName=Playground
AppVersion=1.0.0
;AppVerName=Playground 1.0.0
AppPublisher=Akhdani Reka Solusi
AppPublisherURL=http://www.akhdani.co.id/
AppSupportURL=http://www.akhdani.co.id/
AppUpdatesURL=http://www.akhdani.co.id/
DefaultDirName={pf}\Playground
DisableProgramGroupPage=yes
OutputDir=.
OutputBaseFilename=playground
Compression=lzma/ultra64
SolidCompression=yes

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\Playground.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\content_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\content_shell.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\d3dcompiler_47.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\ffmpeg.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\icudtl.dat"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\libEGL.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\libGLESv2.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\LICENSE"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\LICENSES.chromium.html"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\msvcp120.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\msvcr120.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\natives_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\node.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\snapshot_blob.bin"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\ui_resources_200_percent.pak"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\vccorlib120.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\version"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\xinput1_3.dll"; DestDir: "{app}"; Flags: ignoreversion
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\locales\*"; DestDir: "{app}\locales"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "D:\Labs\playground\aplikasi\desktop\build\v1.0.0\Playground-win32-ia32\resources\*"; DestDir: "{app}\resources"; Flags: ignoreversion recursesubdirs createallsubdirs
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{commonprograms}\Playground"; Filename: "{app}\Playground.exe"
Name: "{commondesktop}\Playground"; Filename: "{app}\Playground.exe"; Tasks: desktopicon

[Run]
Filename: "{app}\Playground.exe"; Description: "{cm:LaunchProgram,Playground}"; Flags: nowait postinstall skipifsilent

